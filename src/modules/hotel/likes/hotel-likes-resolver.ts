import {
  Resolver,
  UseMiddleware,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
  ID,
} from "type-graphql";

import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";
import { MyContext } from "../../../types/MyContext";
import { HotelLike } from "../../../entity/HotelLike";
import { User } from "../../../entity/User";
import { Hotel } from "../../../entity/Hotel";

@InputType()
export class AddHotelLikeInput {
  @Field(() => ID)
  hotelId: string;
}

@InputType()
export class RemoveHotelLikeInput {
  @Field(() => ID)
  hotelLikeId: string;

  @Field(() => ID)
  hotelId: string;
}

@Resolver()
export class HotelLikesResolver {
  @UseMiddleware(isAuth, logger)
  @Mutation(() => HotelLike, { name: `addHotelLike` })
  async addHotelLike(
    @Ctx() context: MyContext,
    @Arg("data", () => AddHotelLikeInput, { nullable: false })
    data: AddHotelLikeInput,
  ): Promise<HotelLike> {
    const { hotelId } = data;

    const rawHotelLike = await HotelLike.createQueryBuilder()
      .insert()
      .values([
        {
          userId: context.userId,
          hotelId,
        },
      ])
      .execute();

    const findHotelLike = await HotelLike.createQueryBuilder("hotelLike")
      .where("hotelLike.id = :id", { id: rawHotelLike.raw[0].id })
      .getOne();

    // add HotelLike to User
    await User.createQueryBuilder()
      .relation(User, "hotelLikes")
      .of(context.userId)
      .add(rawHotelLike.raw[0].id)
      .then(() => console.log("User 'hotelLikes' data is set"))
      .catch(err => console.error(err));

    // add HotelLike to + Hotel
    await Hotel.createQueryBuilder()
      .relation(Hotel, "hotelLikes")
      .of(hotelId)
      .add(rawHotelLike.raw[0].id)
      .then(() => console.log("Hotel 'hotelLikes' data is set"))
      .catch(err => console.error(err));

    // return or like or throw an error
    if (findHotelLike !== undefined) {
      return findHotelLike;
    }

    throw new Error(`Error saving like for Hotel ID: ${hotelId}`);
  }

  @UseMiddleware(isAuth, logger)
  @Mutation(() => String, { name: `removeHotelLike` })
  async removeHotelLike(
    @Ctx() { userId }: MyContext,
    @Arg("data", () => RemoveHotelLikeInput, { nullable: false })
    { hotelId, hotelLikeId }: RemoveHotelLikeInput,
  ): Promise<string> {
    await HotelLike.createQueryBuilder("hotelLike")
      .delete()
      .from(HotelLike)
      .where("id = :hotelLikeId", { hotelLikeId })
      .andWhere("userId = :userId", { userId })
      .execute();

    await User.createQueryBuilder()
      .relation(User, "hotelLikes")
      .of(userId)
      .remove(hotelLikeId);

    await Hotel.createQueryBuilder()
      .relation(Hotel, "hotelLikes")
      .of(hotelId)
      .remove(hotelLikeId);

    return `hotelLike removed for Hotel: ${hotelId}`;
  }
}
