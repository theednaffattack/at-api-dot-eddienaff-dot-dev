import { InputType, Field } from "type-graphql";

// import { IsReservationAvailable } from "./isReservationAvailable";

// prettier-ignore
@InputType()
export class DateInput {
  
  @Field()
  from: string;

  
  @Field()
  to: string;

  @Field(() => String)
  hotelId: string;
  
}

// prettier-ignore
@InputType()
export class ReservationInput {
  
  @Field(() => DateInput)
  // @IsReservationAvailable({
  //   message: "no reservations available during dates given",
  // })
  dates: DateInput;

  
}
