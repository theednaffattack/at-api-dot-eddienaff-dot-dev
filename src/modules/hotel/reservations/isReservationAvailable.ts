import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Between } from "typeorm";
import { isWithinInterval } from "date-fns";

// import { Reservation } from "../../../entity/Reservation";
import { ReservationInput } from "./ReservationInput";
import { Room } from "../../../entity/Room";

// TypeORM Query Operators
export const AfterDate = (fromTo: ReservationInput["dates"]) =>
  Between(fromTo.from, fromTo.to);
export const BeforeDate = (fromTo: ReservationInput["dates"]) =>
  Between(fromTo.from, fromTo.to);

// prettier-ignore
@ValidatorConstraint({ async: true })
export class IsReservationAvailableConstraint implements ValidatorConstraintInterface {
  async validate(resInput: any) {
    
    console.log("ROOM VALIDATOR RUNNING", { resInput})


    const theRoomNew = await Room.find({
      relations: ["hotel", "reservations"],
      where: { hotelId: resInput.hotelId },
    })

    console.log("ROOM VALIDATOR RUNNING", { resInput, theRoomNew})

    
    
    
    const theRoom = await Room.find({
      relations: ["hotel", "reservations"],
      where: { hotelId: resInput.dates.hotelId },
    })
      .then(data =>{
        console.log("CAN I SEE FETCHED DATA IN VALIDATOR?",data)
        return data.map(item => {
    console.log("ROOM VALIDATOR RUNNING", {truthyReservations: item && item.reservations})
    return item && item.reservations && item.reservations.length > 0
            ? item.reservations.filter(reservation => {

              const truthy = !isWithinInterval(Date.parse(resInput.dates.from), {
                start: reservation.from,
                end: reservation.to,
              }) &&
              !isWithinInterval(Date.parse(resInput.dates.to), {
                start: reservation.from,
                end: reservation.to,
              });
              console.log("CHECK TRUTHY ITEMS IN VALIDATOR",{truthy, from: !isWithinInterval(Date.parse(resInput.dates.from), {
                start: reservation.from,
                end: reservation.to,
              }), to: !isWithinInterval(Date.parse(resInput.dates.to), {
                start: reservation.from,
                end: reservation.to,
              })})
                return (
                  !isWithinInterval(Date.parse(resInput.dates.from), {
                    start: reservation.from,
                    end: reservation.to,
                  }) &&
                  !isWithinInterval(Date.parse(resInput.dates.to), {
                    start: reservation.from,
                    end: reservation.to,
                  })
                );
              })[0]
            : [];
        })
  })
      .catch(error => console.error(error));

    return theRoom && theRoom.length > 0 ? true : false;
  }
}

export function IsReservationAvailable(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsReservationAvailableConstraint,
    });
  };
}
