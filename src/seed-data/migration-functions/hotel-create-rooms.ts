import { finance } from "faker";

import { Room } from "../../entity/Room";
import { randomNumber, randomInteger } from "../../global-utils/random-number";
import { Hotel } from "../../entity/Hotel";

const roomTypes = ["suite", "standard", "penthouse"];

export async function createRooms() {
  try {
    const hotels = await Hotel.createQueryBuilder("hotel")
      .select()
      .getMany();

    hotels.forEach(async (hotel) => {
      for (let index = 0; index < randomNumber(10, 80); index++) {
        const roomObject: Partial<Room> = {
          beds: randomInteger(1, 2),
          costPerNight: parseInt(finance.amount(110, 450), 10),
          maxOccupancy: randomInteger(2, 4),
          roomNumber: "",
          type: roomTypes[randomInteger(1, 3) - 1],
          reservations: [],
          hasId: () => false,
        };

        const newRoom = await Room.createQueryBuilder("room")
          .insert()
          .values(roomObject)
          .execute();

        await Room.createQueryBuilder("room")
          .relation(Room, "hotel")
          .of(newRoom.identifiers[0].id)
          .set(hotel.id);
      }
    });
  } catch (error) {
    console.error("ERROR GENERATING ROOMS OR SOMETHING\n", error);
  }
}
