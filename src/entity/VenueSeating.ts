import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Venue } from "./Venue";
import { Reservation } from "./Reservation";

// prettier-ignore
@ObjectType()
@Entity()
export class VenueSeating extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  roomNumber: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  beds: number;

  @Field()
  @Column()
  maxOccupancy: number;

  @Field()
  @Column()
  costPerNight: number;

  @Field(() => [Reservation], { nullable: true })
  @OneToMany(
    () => Reservation,
    reservation => reservation.room,
  )
  reserved: Reservation[];

  @Field(() => Venue)
  @ManyToOne(
    () => Venue,
    venue => venue.seats,
    { cascade: true },
  )
  venue: Venue;
}
