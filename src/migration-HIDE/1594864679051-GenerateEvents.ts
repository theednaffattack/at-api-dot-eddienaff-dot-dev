import { MigrationInterface } from "typeorm";
import { EventEntity } from "../entity/EventEntity";
import museumPubDataSF from "../seed-data/overpass-turbo-queries/museum-pub-restaurant.json";

export class GenerateEvents1594864679051 implements MigrationInterface {
  public async up(): Promise<void> {
    const prepEvents: Partial<EventEntity>[] = [];

    for (const element of museumPubDataSF.elements) {
      console.log("VIEW ELEMENTS", element);

      prepEvents.push(element);
    }

    await EventEntity.createQueryBuilder()
      .insert()
      .values(prepEvents)
      .execute();
  }

  public async down(): Promise<void> {}
}

async function testUp(): Promise<void> {
  const prepEvents: Partial<EventEntity>[] = [];

  for (const element of museumPubDataSF.elements) {
    let buildStreetAddress;

    if (element.tags?.["addr:housenumber"] && element.tags?.["addr:street"]) {
      buildStreetAddress =
        element.tags["addr:housenumber"] + " " + element.tags["addr:street"];
    } else {
      buildStreetAddress = "no address";
    }

    const newElement: Partial<EventEntity> = {
      name: element.tags["name"],
      // eslint-disable-next-line @typescript-eslint/camelcase
      end_time: new Date(),
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_time: new Date(),
      price: 25,
    };
    console.log("VIEW ELEMENTS", element);
    prepEvents.push(element);
  }

  await EventEntity.createQueryBuilder()
    .insert()
    .values(prepEvents)
    .execute();
}

testUp();
