import { Resolver, UseMiddleware, Mutation, Arg, Ctx } from "type-graphql";
import { InsertResult } from "typeorm";

import { Review } from "../../../entity/Review";
import { BaseReviewInput } from "../BaseReviewInput";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";

@Resolver()
export class ReviewsResolver {
  @UseMiddleware(isAuth, logger)
  @Mutation(() => Review, { name: `createReview` })
  async create(
    @Ctx() context: MyContext,
    @Arg("data", () => BaseReviewInput) data: BaseReviewInput
  ): Promise<any> {
    const { hotelId, text, title, value } = data;

    const isThisRawReview: InsertResult = await Review.createQueryBuilder(
      "review"
    )
      .insert()
      .into(Review)
      .values([
        {
          hotelId,
          text,
          title,
          userId: context.userId,
          value,
        },
      ])
      .execute();

    await User.createQueryBuilder()
      .relation(Review, "user")
      .of(context.userId)
      .set(isThisRawReview.raw.id)
      .then((data) => console.log("CAN I SEE 'SET' DATA?", data))
      .catch((err) => console.error(err));

    return await Review.findOne({
      where: { id: isThisRawReview.raw[0].id },
    });
  }
}
