import { MigrationInterface, QueryRunner } from "typeorm";

import { generateHotelPhotos } from "../seed-data/migration-functions/hotel-photo-migration-body";

export class SeedHotelPhotos1595642928791 implements MigrationInterface {
  public async up(): Promise<any> {
    generateHotelPhotos({ numMax: 6, numMin: 3 });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.clearTable("photo");
  }
}
