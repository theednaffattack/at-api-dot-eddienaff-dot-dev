import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from "typeorm";
import { Field, ID, ObjectType, Int } from "type-graphql";
import { Max } from "class-validator";

import { HotelLike } from "./HotelLike";
import { Photo } from "./Photo";
import { Review } from "./Review";
import { Room } from "./Room";

@ObjectType()
export class PointObject {
  @Field()
  longitude?: number;
  @Field()
  latitude?: number;
}

@ObjectType()
export class PointObjectClassType {
  @Field()
  type?: "Point";

  @Field(() => [Int])
  coordinates?: number[];
}

@ObjectType()
@Entity()
export class Hotel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text", { nullable: false })
  name: string;

  @Field(() => HotelLike, { nullable: true })
  @OneToMany(
    () => HotelLike,
    hotelLike => hotelLike.hotel,
    { nullable: true },
  )
  hotelLikes?: HotelLike[];

  @Field(() => Photo, { nullable: true })
  @OneToMany(
    () => Photo,
    photo => photo.hotel,
    { nullable: true },
  )
  photos?: Photo[];

  @Field()
  @Column({ type: "int", nullable: false })
  price: number;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  amenities?: string[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(
    () => Review,
    review => review.hotel,
    { nullable: true },
  )
  reviews?: Review[];

  @Field(() => [Room], { nullable: true })
  @OneToMany(
    () => Room,
    room => room.hotel,
    { nullable: true },
  )
  rooms?: Room[];

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

  @Field({ nullable: true })
  weatherIconName?: string;

  @Field({ nullable: true })
  distanceKm?: string;

  @Field({ nullable: true })
  temperature?: string;

  @Field({ nullable: true })
  weatherDescription?: string;

  @Column("geometry", {
    nullable: true,
  })
  @Index({
    spatial: true,
  })
  geom?: object;

  @Field(() => PointObjectClassType, { nullable: true })
  @Index({
    spatial: true,
  })
  @Column({
    type: "geography",
    nullable: true,
    spatialFeatureType: "Point",
    srid: 4326,
  })
  coordinates?: PointObjectClassType;
}

@ObjectType()
export class HotelResolverReturnFake {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => HotelLike, { nullable: true })
  hotelLikes?: HotelLike[];

  @Field(() => Photo, { nullable: true })
  photos?: Photo[];

  @Field()
  price: number;

  @Field(() => [String], { nullable: true })
  amenities?: string[];

  @Field(() => [Review], { nullable: true })
  reviews?: Review[];

  @Field(() => [Room], { nullable: true })
  rooms?: Room[];

  @Field({ nullable: true })
  loveCount: number;

  @Field({ nullable: true })
  commentCount?: number;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  suite?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  @Max(5)
  zipCode?: string;

  @Field({ nullable: true })
  @Max(4)
  zipCodeSuffix?: number;

  @Field({ nullable: true })
  weatherIconName?: string;

  @Field({ nullable: true })
  distanceKm?: string;

  @Field({ nullable: true })
  temperature?: string;

  @Field({ nullable: true })
  weatherDescription?: string;

  @Field(() => PointObject, { nullable: true })
  coordinates?: PointObject;
}
