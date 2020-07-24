(import { MigrationInterface } from "typeorm";
import { lorem } from "faker";

import { Venue } from "../entity/Venue";
import { User } from "../entity/User";
import { Review } from "../entity/Review";
import { randomNumber } from "../global-utils/random-number";

export class SeedVenuesWithReviews1595017531832 implements MigrationInterface {
  public async up(): Promise<void> {
    const allVenues = await Venue.createQueryBuilder("venue")
      .select()
      .getMany();

    allVenues.forEach(async venue => {
      const num = randomNumber(6, 35);
      const manyRandomUsers = await User.createQueryBuilder("user")
        .select("user.id")
        .orderBy("RANDOM()")
        .limit(num)
        .getMany();

      const manyReviewsPrep = manyRandomUsers.map(user => {
        return Review.create({
          userId: user.id,
          venueId: venue.id,
          text: lorem.words(25),
          title: lorem.words(randomNumber(1, 5)),
          value: 4.5,
        });
      });

      const manyReviews = await Review.createQueryBuilder("review")
        .insert()
        .values(manyReviewsPrep)
        .execute();

      await Venue.createQueryBuilder("venue")
        .relation(Venue, "reviews")
        .of(venue)
        .add(manyReviews);
    });

    console.log("MANY VENUES", { allVenues });
  }

  public async down(): Promise<void> {
    await Review.createQueryBuilder("review")
      .delete()
      .from(Review)
      .where("venueId IS NOT NULL")
      .execute();
  }
}
