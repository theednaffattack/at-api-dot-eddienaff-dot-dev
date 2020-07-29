import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
// import { inspect } from "util";

import { logger } from "../middleware/logger";
import { isAuth } from "../middleware/isAuth";
import { Hotel, HotelResolverReturnFake } from "../../entity/Hotel";
import { GetAllHotelInput } from "./CreateHotel";

@Resolver()
export class GetAllHotelsResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => [HotelResolverReturnFake], {
    name: "getAllHotels",
    nullable: "itemsAndList",
  })
  async getAllHotels(
    @Arg("data", () => GetAllHotelInput, { nullable: true })
    data: GetAllHotelInput,
  ): Promise<HotelResolverReturnFake[]> {
    const hotels = await Hotel.createQueryBuilder("hotel")
      .select()
      .leftJoinAndSelect("hotel.photos", "photos")
      .leftJoinAndSelect("hotel.reviews", "reviews")
      .leftJoinAndSelect("hotel.rooms", "rooms")
      .orderBy("RANDOM()")
      .limit(data.take)
      // .skip(data.skip)
      // .take(data.take)
      .getMany();

    const blahblah: HotelResolverReturnFake[] = [];

    for (const hotel of hotels) {
      blahblah.push({
        ...hotel,
        coordinates: {
          longitude: hotel.coordinates?.coordinates?.[0],
          latitude: hotel.coordinates?.coordinates?.[1],
        },
      });
    }

    // const coordsFixed = hotels.map(hotel => {
    //   return {
    //     ...hotel,
    //     coordinates: {
    //       longitude: hotel.coordinates?.coordinates?.[0] ?? 0,
    //       latitude: hotel.coordinates?.coordinates ?? 0,
    //     },
    //   };
    // });

    // console.log("NEW HOTELS RESOLVER", inspect({ blahblah }, false, 4, true));

    return blahblah; // coordsFixed;
  }
}
