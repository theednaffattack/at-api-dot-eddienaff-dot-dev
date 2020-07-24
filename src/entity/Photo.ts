import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // OneToOne,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
// import { PhotoMetadata } from "./PhotoMetadata";
import { Hotel } from "./Hotel";
import { Venue } from "./Venue";

// prettier-ignore
@ObjectType()
@Entity()
export class Photo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  uri: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ default: false, nullable: true })
  isPublished: boolean;

  // @OneToOne(
  //   () => PhotoMetadata,
  //   metadata => metadata.photo,
  //   { cascade: true },
  // )
  // metadata: PhotoMetadata;

  @Column({ nullable: true })
  hotelId: number;

  @ManyToOne(
    () => Hotel,
    hotel => hotel.photos,
  )
  hotel: Hotel;

  @Column({ nullable: true })
  venueId: number;

  @ManyToOne(
    () => Venue,
    venue => venue.photos,
  )
  venue: Venue;
}

export class PhotoType {
  // @Field(() => ID)
  // id: string;

  @Field()
  uri: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  isPublished: boolean;

  @Field(() => Hotel)
  hotel: Hotel;
}
