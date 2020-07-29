import { MigrationInterface } from "typeorm";

import { mapOverVenues } from "../scripts/seed-venue-from-feature";
import { Venue } from "../entity/Venue";
// import { devOrmconfig } from "../config/dev-orm-config";

export class GenerateVenueData1594843966532 implements MigrationInterface {
  public async up(): Promise<void> {
    mapOverVenues();
  }

  public async down(): Promise<void> {
    try {
      await Venue.createQueryBuilder("venue")
        .delete()
        .execute();
    } catch (error) {
      console.error("ERROR", error);
    }
  }
}

// export async function manualDown(): Promise<void> {

// import { devOrmconfig } from "../config/dev-orm-config";
//   try {
//     await createConnection(devOrmconfig);

//     await Venue.createQueryBuilder("venue")
//       .delete()
//       .execute();
//   } catch (error) {
//     console.error("ERROR", error);
//   }
// }

// manualDown();
