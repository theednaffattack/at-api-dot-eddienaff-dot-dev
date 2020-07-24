import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductionTables1593226042167 implements MigrationInterface {
  name = "CreateProductionTables1593226042167";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uri" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "isPublished" boolean DEFAULT false, "hotelId" uuid, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uri" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, "sentBy" character varying, "userId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomNumber" character varying NOT NULL, "type" character varying NOT NULL, "beds" integer NOT NULL, "maxOccupancy" integer NOT NULL, "costPerNight" integer NOT NULL, "hotelId" uuid, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "from" TIMESTAMP NOT NULL, "to" TIMESTAMP NOT NULL, "userId" uuid, "roomId" uuid, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" text NOT NULL, "profileImageUri" text, "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_3d328f5ff477a6bd7994cdbe823" UNIQUE ("profileImageUri"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" numeric(2,1) NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "likesId" uuid, "userId" uuid, "hotelId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "hotel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "price" integer NOT NULL, "amenities" text, "loveCount" integer NOT NULL DEFAULT 0, "commentCount" integer, "address" text, "suite" text, "city" text, "state" text, "zipCode" text, "zipCodeSuffix" integer, "geom" geometry, "coordinates" geography(Point,4326), CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c5f710bd79548d56a0518782c4" ON "hotel" USING GiST ("geom") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "photo_metadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "height" integer NOT NULL, "width" integer NOT NULL, "orientation" character varying NOT NULL, "compressed" boolean NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_da29f04585dc190eb00e4d73420" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_followers_user" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_980ff03f415077df184596dcf73" PRIMARY KEY ("userId_1", "userId_2"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26312a1e34901011fc6f63545e" ON "user_followers_user" ("userId_1") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_110f993e5e9213a7a44f172b26" ON "user_followers_user" ("userId_2") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo" ADD CONSTRAINT "FK_2d87fc3c550c8acbc9c232963ec" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD CONSTRAINT "FK_dc40417dfa0c7fbd70b8eb880cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_2fac52abaa01b54156539cad11c" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_ee6959f2cbe32d030b5e58b45d7" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_93a4a75e3c4dd798e19f0115bcf" FOREIGN KEY ("likesId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_86bed2411a875eb84306554f946" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_26312a1e34901011fc6f63545e2" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_110f993e5e9213a7a44f172b264" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_110f993e5e9213a7a44f172b264"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_26312a1e34901011fc6f63545e2"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_86bed2411a875eb84306554f946"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_93a4a75e3c4dd798e19f0115bcf"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_ee6959f2cbe32d030b5e58b45d7"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_2fac52abaa01b54156539cad11c"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP CONSTRAINT "FK_dc40417dfa0c7fbd70b8eb880cc"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "photo" DROP CONSTRAINT "FK_2d87fc3c550c8acbc9c232963ec"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_110f993e5e9213a7a44f172b26"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_26312a1e34901011fc6f63545e"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user_followers_user"`, undefined);
    await queryRunner.query(`DROP TABLE "photo_metadata"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_c5f710bd79548d56a0518782c4"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "hotel"`, undefined);
    await queryRunner.query(`DROP TABLE "review"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "reservation"`, undefined);
    await queryRunner.query(`DROP TABLE "room"`, undefined);
    await queryRunner.query(`DROP TABLE "message"`, undefined);
    await queryRunner.query(`DROP TABLE "image"`, undefined);
    await queryRunner.query(`DROP TABLE "photo"`, undefined);
  }
}
