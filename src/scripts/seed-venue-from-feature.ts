import { getRepository } from "typeorm";
import { name } from "faker";

// import { devOrmconfig } from "../config/dev-orm-config";
import { Venue } from "../entity/Venue";
// import venueData from "../seed-data/bay-area-venues.json";
import venueData from "../seed-data/overpass-turbo-queries/museum-pub-restaurant.json";

export interface ElementInterface {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    [key: string]: string;
  };
}

// interface VenueInterface {
//   version: number;
//   generator: string;
//   osm3s: {
//     timestamp_osm_base: string;
//     timestamp_areas_base: string;
//     copyright: string;
//   };
//   elements: ElementInterface[];
// }

// function randomNumber(min: number, max: number): number {
//   return Math.random() * (max - min) + min;
// }

// const sampleAmenities = ["wifi", "parking", "restaurant", "swimming", "bar"];

export async function seedVenueFromElementNode(
  element: ElementInterface,
): Promise<void> {
  // const slicedAmenities = sampleAmenities.slice(0, randomNumber(1, 5));
  let buildStreetAddress;

  if (element.tags?.["addr:housenumber"] && element.tags?.["addr:street"]) {
    buildStreetAddress =
      element.tags["addr:housenumber"] + " " + element.tags["addr:street"];
  } else {
    buildStreetAddress = "no address";
  }

  const filterForTypeOfVenue = Object.keys(element.tags)
    // .filter(thing => thing === "amenity" || thing === "tourism")
    .filter(thing => thing !== "addr:housenumber" && thing !== "addr:street")
    .map(key => element.tags[key]);

  const prepareVenue = {
    address: buildStreetAddress,
    city: "San Francisco",
    commentCount: 0,
    coordinates: {
      type: "Point",
      coordinates: [element.lon, element.lat],
    },
    loveCount: 0,
    name: element.tags.name ? element.tags.name : name.firstName() + " Place",
    state: "CA",
    type: [...filterForTypeOfVenue],
    zipCode: element.tags["addr:postcode"]
      ? element.tags["addr:postcode"]
      : "no zipcode",
  };

  const createFirst = getRepository<Venue>("Venue").create(prepareVenue);

  await createFirst.save();

  // const anything = await getRepository<Venue>("Venue").save(prepareFeature);
  // } catch (error) {
  //   console.log("ERROR!\n", error);
  // }
}

export function mapOverVenues(): void {
  const recordsLength = venueData.elements.length - 1;
  const venueSlice: ElementInterface[] = venueData.elements.slice(
    0,
    recordsLength,
  );
  venueSlice.forEach(venue => {
    seedVenueFromElementNode(venue);
  });
}

mapOverVenues();

// ts-node packages/server/scripts/seed-venue-from-element.ts
