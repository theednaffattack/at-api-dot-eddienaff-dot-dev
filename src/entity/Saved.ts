import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity()
export class Saved extends BaseEntity {
  /**id field */
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.savedItems,
    { cascade: true },
  )
  user: User;
}
