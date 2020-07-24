import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

import hotelPhotoDict from "../config/seeds/hotelPhotosDict.json";
import { Photo } from "../entity/Photo";
import { Hotel } from "../entity/Hotel";

// import { HotelDictInterface } from "../seed-data/generated/HotelDictInterface";
// import { writeFileSync } from "fs";
// import { inspect } from "util";

type PhotoLike = {
  description: string;
  // hotelId: string;
  isPublished: boolean;
  name: string;
  uri: string;
};

export class AddPhotosToHotels1593126008225 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    const hotelDict: { [key: string]: PhotoLike[] } = hotelPhotoDict;

    // photosSeedPrep.forEach((photos, index, photoSeedArr) => {
    //   console.log(
    //     `VIEW PHOTO INDEX ${index}: length = ${photos.length}`,
    //     photoSeedArr[index] ? photoSeedArr[index] : "nope nothing",
    //   );

    //   const mappedPhotos = photos.map((image, index) => {
    //     const { hotelId, name, ...theRest } = image;
    //     return {
    //       name: name + " - " + index.toString(),
    //       ...theRest,
    //     };
    //   });

    //   const key = photoSeedArr[index][0].hotelId;

    //   hotelDict[key] = [...mappedPhotos];
    // });

    // console.log(
    //   `VIEW HOTEL DICT (source array "photosSeedPrep" ${photosSeedPrep.length}):)`,
    //   inspect(hotelDict, false, 3, true),
    // );

    await Promise.all(
      Object.keys(hotelDict).map(async (key: string) => {
        // save all Photos
        const photoIds = await getRepository("Photo").save([...hotelDict[key]]);

        console.log("DOES THIS RETURN PHOTO ID'S", photoIds);

        // get all photos
        const allPhotos = await Photo.createQueryBuilder("photo").getMany();

        // add Photo ids to already saved Hotel data
        await getRepository("Hotel")
          .createQueryBuilder()
          .relation(Hotel, "photos")
          .of(key)
          .add(hotelDict[key]);

        // add Hotel ids to already saved Photo data
        await Photo.createQueryBuilder("photo")
          .relation(Photo, "hotel")
          .of({
            ...allPhotos.map(photo => {
              return { id: photo.id };
            }),
          })
          .set({
            ...Object.keys(hotelDict).map(id => {
              return { id: id };
            }),
          });
        // .save([...hotelDict[key]]);

        // await getRepository("Photo")
        //   .createQueryBuilder()
        //   .relation("hotel")
        //   .of(photoId)
        //   .set(key);
      }),
    );

    // save photos

    // await getRepository("Photo").save(seedData.flat(2));

    // await getRepository("Hotel").save(hotelDict);
  }

  public async down(_: QueryRunner): Promise<any> {}
}
