import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Venue } from "./Venue";

@ObjectType()
@Entity()
export class EventEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => User)
  @OneToMany(
    () => User,
    user => user.events,
  )
  attendees: User[];

  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  end_time: Date;

  @Field()
  @Column("text", { nullable: false })
  name: string;

  @Field(() => ID)
  @Column({ nullable: false })
  organizerId: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.events,
    { cascade: true },
  )
  organizer: User;

  @Field()
  @Column({ type: "int", nullable: false })
  price: number;

  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  start_time: Date;

  @Field(() => ID)
  @Column({ nullable: false })
  venueId: string;

  @Field(() => Venue)
  @ManyToOne(
    () => Venue,
    venue => venue.events,
    { cascade: true },
  )
  venue: Venue;
}
