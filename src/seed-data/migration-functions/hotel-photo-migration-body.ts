import { lorem } from "faker";
import fetch from "node-fetch";

// import { createConnection } from "typeorm";
// import { devOrmconfig } from "../config/dev-orm-config";

import { Photo } from "../../entity/Photo";
import { Hotel as HotelEntity } from "../../entity/Hotel";

const unsplashHotelsCollectionId = 3466704;

function randomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

async function getImagesFromApiAsync() {
  try {
    let responseThing = await fetch(
      `https://source.unsplash.com/collection/${unsplashHotelsCollectionId}/400x500`,
      { method: "GET" }
    );

    return responseThing;
  } catch (error) {
    console.error(error);
  }
  return "no-url";
}

export async function generateHotelPhotos({
  numMax = 9,
  numMin = 3,
}: {
  numMax: number;
  numMin: number;
}) {
  try {
    const allHotels = await HotelEntity.createQueryBuilder("hotel")
      .select()
      .getMany();

    for (const hotel of allHotels) {
      const numberOfPhotos = randomNumber(numMin, numMax);

      // 1 - insert photo record
      // 2 - add hotel relation
      await Promise.all(
        Array.from(Array(numberOfPhotos).keys()).map(async () => {
          // 1
          const insertPhoto = await Photo.createQueryBuilder("photo")
            .insert()
            .values({
              description: lorem.sentence(3, 7),
              name: lorem.words(3),
              uri: await getImagesFromApiAsync().then((data) => {
                return data !== "no-url" ? data.url : data;
              }),
            })
            .execute();

          // 2
          await Photo.createQueryBuilder("photo")
            .relation(Photo, "hotel")
            .of(insertPhoto.identifiers[0])
            .set(hotel.id);

          return insertPhoto.identifiers[0].id;
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}
