// import { createConnection, getRepository } from "typeorm";
import { commerce, name } from "faker";

// import { devOrmconfig } from "../config/dev-orm-config";
import { Hotel } from "../entity/Hotel";
import hotelData from "../seed-data/overpass-turbo-queries/overpass-hotels-sf.json";
import { ElementInterface } from "./seed-venue-from-feature";

export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const sampleAmenities = ["wifi", "parking", "restaurant", "swimming", "bar"];

export async function seedHotelFromElement(
  element: ElementInterface,
): Promise<void> {
  const slicedAmenities = sampleAmenities.slice(0, randomNumber(1, 5));
  let buildStreetAddress;

  if (element.tags?.["addr:housenumber"] && element.tags?.["addr:street"]) {
    buildStreetAddress =
      element.tags["addr:housenumber"] + " " + element.tags["addr:street"];
  } else {
    buildStreetAddress = "no address";
  }

  const prepareFeature = {
    address: buildStreetAddress,
    amenities: [...slicedAmenities],
    city: element.tags["addr:city"]
      ? element.tags["addr:city"]
      : "San Francisco",
    commentCount: 0, // random.number(659),
    coordinates: {
      type: "Point",
      coordinates: [element.lon, element.lat],
    },
    loveCount: 0, // random.number(659),
    name: element.tags.name ? element.tags.name : "Hotel " + name.firstName(),
    price: parseInt(commerce.price(150, 850), 10),
    state: element.tags["addr:state"] ? element.tags["addr:state"] : "CA",
    zipCode: element.tags["addr:postcode"] ? element.tags["addr:postcode"] : "", // address.zipCode(),
  };
  // try {
  //   await createConnection(devOrmconfig);

  const createFirst = Hotel.create(prepareFeature);

  await createFirst.save();

  //   // const anything = await getRepository<Hotel>("Hotel").save(prepareFeature);
  // } catch (error) {
  //   console.log("ERROR!\n", error);
  // }
}

export function mapOverHotels(): void {
  const hotelsLength = hotelData.elements.length - 1;
  const hotelSlice = hotelData.elements.slice(0, hotelsLength);
  hotelSlice.forEach(hotel => {
    seedHotelFromElement(hotel);
  });
}

// ts-node packages/server/scripts/seed-hotel-from-element.ts
