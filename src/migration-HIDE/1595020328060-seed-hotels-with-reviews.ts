import { MigrationInterface } from "typeorm";
import { lorem } from "faker";

import { Hotel as HotelEntity } from "../entity/Hotel";
import { randomNumber } from "../scripts/seed-hotel-from-element";
import { User } from "../entity/User";
import { Review } from "../entity/Review";

export class SeedHotelsWithReviews1595020328060 implements MigrationInterface {
  public async up(): Promise<void> {
    const allHotels = await HotelEntity.createQueryBuilder("hotel")
      .select()
      .getMany();

    allHotels.forEach(async hotel => {
      const num = randomNumber(88, 300);
      const manyRandomUsers = await User.createQueryBuilder("user")
        .select("user.id")
        .orderBy("RANDOM()")
        .limit(num)
        .getMany();

      const manyReviewsPrep = manyRandomUsers.map(user => {
        return Review.create({
          userId: user.id,
          hotelId: hotel.id,
          text: lorem.words(25),
          title: lorem.words(randomNumber(1, 5)),
          value: 4.5,
        });
      });

      const manyReviews = await Review.createQueryBuilder("review")
        .insert()
        .values(manyReviewsPrep)
        .execute();

      await HotelEntity.createQueryBuilder("hotel")
        .relation(HotelEntity, "reviews")
        .of(HotelEntity)
        .add(manyReviews);
    });

    console.log("MANY HOTELS", { allHotels });
  }

  public async down(): Promise<void> {
    await Review.createQueryBuilder("review")
      .delete()
      .from(Review)
      .execute();
  }
}
