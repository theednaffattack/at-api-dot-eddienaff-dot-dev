import { MigrationInterface } from "typeorm";

// import { mapOverHotels } from "../scripts/seed-hotel-from-element.tsHIDE";
import { Hotel } from "../entity/Hotel";

export class GenerateHotels1595040370075 implements MigrationInterface {
  public async up(): Promise<void> {
    // mapOverHotels();
  }

  public async down(): Promise<void> {
    try {
      await Hotel.createQueryBuilder("venue")
        .delete()
        .execute();
    } catch (error) {
      console.error("ERROR", error);
    }
  }
}
