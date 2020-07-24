import { ObjectType, Field, ID } from "type-graphql";
import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { Hotel } from "./Hotel";

export interface CommentPayload {
  id: number;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  sentBy?: string;
  user?: User;
}

// prettier-ignore
@ObjectType()
@Entity()
export class HotelLike extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => ID)
  @Column({ nullable: true })
  hotelId: string;

  @Field(() => Hotel)
  @ManyToOne(
    () => Hotel,
    hotel => hotel.hotelLikes,
    { cascade: true },
  )
  hotel: Hotel;

  @Field(() => ID)
  @Column({ nullable: true })
  userId: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.messages,
    { cascade: true },
  )
  user: User;
}
