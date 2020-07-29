import { MigrationInterface } from "typeorm";

import { createRooms } from "../seed-data/migration-functions/hotel-create-rooms";

export class SeedHotelsWithRooms1595978620507 implements MigrationInterface {
  public async up(): Promise<any> {
    createRooms();
  }

  public async down(): Promise<any> {}
}
