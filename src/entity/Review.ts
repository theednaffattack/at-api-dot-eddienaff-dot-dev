import { ObjectType, Field, Float, ID } from "type-graphql";
import {
  ManyToOne,
  // OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { Hotel } from "./Hotel";
import { Venue } from "./Venue";

// prettier-ignore
@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  
  @Field(() => Float)
  @Column("decimal", { precision: 2, scale: 1 })
  value: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  text: string;

  
  // @Field(() => User)
  // @ManyToOne(
  //   () => User,
  //   user => user.reviewLikes,
  //   { cascade: true },
  // )
  // likes: User;



  
  

  
  @Column({ nullable: true })
  userId: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.reviews,
    { cascade: true },
  )
  user: User;

  @Column({ nullable: true })
  hotelId: string;
  
  @Field(() => Hotel)
  @ManyToOne(
    () => Hotel,
    hotel => hotel.reviews,
    { cascade: true },
  )
  hotel: Hotel;

  @Column({ nullable: true })
  venueId: string;
  
  @Field(() => Venue)
  @ManyToOne(
    () => Venue,
    venue => venue.reviews,
    { cascade: true },
  )
  venue: Venue;
}
