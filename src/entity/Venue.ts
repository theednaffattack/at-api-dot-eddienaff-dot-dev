import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Max } from "class-validator";

import { Photo } from "./Photo";
import { Review } from "./Review";
import { VenueSeating } from "./VenueSeating";
import { EventEntity } from "./EventEntity";
import { PointObject } from "./Hotel";

@ObjectType()
@Entity()
export class Venue extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text", { nullable: false })
  name: string;

  // @Field(() => HotelLike, { nullable: true })
  // @OneToMany(
  //   () => HotelLike,
  //   hotelLike => hotelLike.hotel,
  //   { nullable: true },
  // )
  // hotelLikes?: HotelLike[];

  @Field(() => [EventEntity], { nullable: "itemsAndList" })
  @OneToMany(
    () => EventEntity,
    event => event.venue,
    { nullable: true },
  )
  events?: EventEntity[];

  @Field(() => Photo, { nullable: true })
  @OneToMany(
    () => Photo,
    photo => photo.venue,
    { nullable: true },
  )
  photos?: Photo[];

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  amenities?: string[];

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  type?: string[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(
    () => Review,
    review => review.venue,
    { nullable: true },
  )
  reviews?: Review[];

  @Field(() => [VenueSeating], { nullable: true })
  @OneToMany(
    () => VenueSeating,
    venueSeating => venueSeating.venue,
    { nullable: true },
  )
  seats?: VenueSeating[];

  @Field({ nullable: true })
  @Column("int", { default: 0 })
  loveCount: number;

  @Field({ nullable: true })
  @Column("int", { nullable: true })
  commentCount?: number;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  suite?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  state?: string;

  @Field({ nullable: true })
  @Max(5)
  @Column("text", { nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  @Max(4)
  @Column("int", { nullable: true })
  zipCodeSuffix?: number;

  @Field(() => PointObject, { nullable: true })
  @Index({
    spatial: true,
  })
  @Column({
    type: "geography",
    nullable: true,
    spatialFeatureType: "Point",
    srid: 4326,
  })
  coordinates?: object;
}
