import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

import hotelSeed from "../config/seeds/generated-hotel-seed.json";
import { Hotel } from "../entity/Hotel";

export class MakeHotels1593126008226 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<Hotel[]> {
    const prepSeed: Partial<Hotel>[] = hotelSeed.map(hotel => {
      const { name, tempId, coordinates, price, ...theRest } = hotel;

      const geom = {
        type: "Point",
        coordinates: [coordinates[0], coordinates[1]],
      };
      //   `SRID=4326;POINT(${theRest.coordinates[0]}, ${theRest.coordinates[1]})`;
      return {
        name: name,
        geom: geom,
        price: parseInt(price, 10),
        ...theRest,
      };
    });

    const anything = await getRepository<Hotel>("Hotel").save(prepSeed);

    return anything;
    // const hotels = Hotel.create(prepSeed); //.save(prepSeed[0]);
    // await Promise.all(hotels.map(hotel => hotel.save()));
  }

  public async down(_: QueryRunner): Promise<any> {}
}
