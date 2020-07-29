import {
  UseMiddleware,
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import isWithinInterval from "date-fns/isWithinInterval";

import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";
import { Reservation } from "../../../entity/Reservation";
import { ReservationInput } from "./ReservationInput";
import { MyContext } from "../../../types/MyContext";
import { Room } from "../../../entity/Room";
import { Hotel } from "../../../entity/Hotel";
import { User } from "../../../entity/User";

@Resolver({ isAbstract: false })
export class ReservationResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => [Reservation], { name: `getAllReservations` })
  async getAllReservations() {
    return await Reservation.find();
  }

  @UseMiddleware(isAuth, logger)
  @Mutation(() => Reservation, { name: `createReservation` })
  async createReservation(
    @Arg("data", () => ReservationInput)
    { dates: { to, from, hotelId } }: ReservationInput,
    @Ctx() { userId }: MyContext
  ): Promise<Reservation> {
    // const findRoomOG = await Room.find({ where: { id: hotelId } });

    const isFromInRange = (
      from: ReservationInput["dates"]["from"],
      reservation: Reservation
    ) =>
      isWithinInterval(Date.parse(from), {
        start: reservation.from,
        end: reservation.to,
      });

    const isToInRange = (
      to: ReservationInput["dates"]["to"],
      reservation: Reservation
    ) =>
      isWithinInterval(Date.parse(to), {
        start: reservation.from,
        end: reservation.to,
      });

    const findTheHotel = await Hotel.findOne({
      relations: ["rooms", "rooms.reservations"],
      where: { id: hotelId },
    });

    let availableHotelRooms:
      | Room[]
      | "cannot find the hotel"
      | "no rooms available.";

    if (!findTheHotel) {
      availableHotelRooms = "cannot find the hotel";
    }

    if (findTheHotel && findTheHotel.rooms && findTheHotel.rooms.length > 1) {
      availableHotelRooms = findTheHotel.rooms.filter((room: Room) => {
        const resMappings: boolean[] = room.reservations.map(
          (reservation: Reservation) => {
            // we're returning a Boolean into the array
            // false = unavailable (reserved), true = available (no overlapping dates)
            return (
              !isFromInRange(from, reservation) && !isToInRange(to, reservation)
            );
          }
        );

        // filter out rooms that have reservations that
        // overlap either of the requested reservation dates
        // seeking a more efficient solution than max looping
        // over every array
        return !resMappings.includes(false);
      });
    } else {
      availableHotelRooms = "no rooms available.";
    }

    const getRoom = await Room.findOne({
      where: {
        id:
          availableHotelRooms &&
          typeof availableHotelRooms !== "string" &&
          availableHotelRooms[0] &&
          availableHotelRooms[0].id
            ? availableHotelRooms[0].id
            : "",
      },
      relations: ["reservations"],
    });
    const getUser = await User.findOne({
      where: { id: userId },
    });

    const newReservation = await Reservation.create({
      from: from,
      to: to,
      user: getUser,
      room: getRoom,
    }).save();

    const existingReservations = getRoom ? getRoom.reservations : [];

    let updatedRoom;

    if (getRoom && existingReservations && existingReservations.length > 0) {
      getRoom.reservations = [...existingReservations, newReservation];
      updatedRoom = await getRoom.save();
      newReservation.room = updatedRoom;
    } else {
      throw Error("No reservations available!");
    }

    console.log(newReservation);

    return newReservation;
  }

  @UseMiddleware(isAuth, logger)
  @Query(() => [Reservation], {
    name: `getAllReservationsByHotelIDAndDateFilter`,
    nullable: "itemsAndList",
  })
  async getAllReservationsByHotelIDAndDateFilter(
    @Arg("data", () => ReservationInput)
    data: any
  ) {
    const theRoom = await Room.find({
      relations: ["hotel", "reservations", "reservations.room"],
      where: { hotel: data.hotelId },
    })
      .then((roomData) =>
        roomData.map((item) => {
          return item && item.reservations
            ? item.reservations.filter((reservation) => {
                console.log(data.dates.from.toISOString());
                console.log(data.dates.to.toISOString());
                console.log(
                  isWithinInterval(reservation.from, {
                    start: data.dates.from.toISOString(),
                    end: data.dates.to.toISOString(),
                  })
                );
                console.log(
                  isWithinInterval(reservation.to, {
                    start: data.dates.from.toISOString(),
                    end: data.dates.to.toISOString(),
                  })
                );
                return (
                  isWithinInterval(reservation.to, {
                    start: data.dates.from.toISOString(),
                    end: data.dates.to.toISOString(),
                  }) ||
                  isWithinInterval(reservation.from, {
                    start: data.dates.from.toISOString(),
                    end: data.dates.to.toISOString(),
                  })
                );
              })[0]
            : [];
        })
      )
      .catch((error) => console.error(error));
    return theRoom ? theRoom : ["error: no room list detected"];
  }
}
