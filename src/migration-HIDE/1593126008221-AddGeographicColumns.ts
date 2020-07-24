import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGeographicColumns1593126008221 implements MigrationInterface {
  name = "AddGeographicColumns1593126008221";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photo_metadata" DROP CONSTRAINT "FK_99f01ed52303cc16139d69f7464"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_metadata" DROP CONSTRAINT "REL_99f01ed52303cc16139d69f746"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_metadata" DROP COLUMN "photoId"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "geom" geometry`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "coordinates" geography(Point,4326)`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "createdAt" SET DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "name"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "name" text NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "price" integer NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "address"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "address" text`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "suite"`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "hotel" ADD "suite" text`, undefined);
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "city"`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "hotel" ADD "city" text`, undefined);
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "state"`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "hotel" ADD "state" text`, undefined);
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "zipCode"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "zipCode" text`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c5f710bd79548d56a0518782c4" ON "hotel" USING GiST ("geom") `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "IDX_c5f710bd79548d56a0518782c4"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "zipCode"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "zipCode" character varying`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "state"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "state" character varying`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "city"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "city" character varying`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "suite"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "suite" character varying`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "address"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "address" character varying`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "price" character varying NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "name"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "name" character varying NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "updatedAt" DROP DEFAULT`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ALTER COLUMN "createdAt" DROP DEFAULT`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "coordinates"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "geom"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_metadata" ADD "photoId" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_metadata" ADD CONSTRAINT "REL_99f01ed52303cc16139d69f746" UNIQUE ("photoId")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_metadata" ADD CONSTRAINT "FK_99f01ed52303cc16139d69f7464" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
