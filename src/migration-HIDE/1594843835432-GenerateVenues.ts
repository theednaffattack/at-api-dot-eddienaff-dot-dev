import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateVenues1594843835432 implements MigrationInterface {
    name = 'GenerateVenues1594843835432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_93a4a75e3c4dd798e19f0115bcf"`, undefined);
        await queryRunner.query(`CREATE TABLE "hotel_like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hotelId" uuid, "userId" uuid, CONSTRAINT "PK_9f6bcd0719db9c751dcddc9c9ed" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "venue_seating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomNumber" character varying NOT NULL, "type" character varying NOT NULL, "beds" integer NOT NULL, "maxOccupancy" integer NOT NULL, "costPerNight" integer NOT NULL, "venueId" uuid, CONSTRAINT "PK_55505a971de114cd6033177566d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "venue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "amenities" text, "loveCount" integer NOT NULL DEFAULT 0, "commentCount" integer, "address" text, "suite" text, "city" text, "state" text, "zipCode" text, "zipCodeSuffix" integer, "coordinates" geography(Point,4326), CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_7019e20b4a9877a9d1ca3ca57d" ON "venue" USING GiST ("coordinates") `, undefined);
        await queryRunner.query(`CREATE TABLE "saved" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_cb4672121c11ed3824acc8d0985" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "event_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "end_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" text NOT NULL, "price" integer NOT NULL, "start_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "organizerId" uuid, "venueId" uuid, CONSTRAINT "PK_c5675e66b601bd4d0882054a430" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "likesId"`, undefined);
        await queryRunner.query(`ALTER TABLE "review" ADD "venueId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "photo" ADD "venueId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "geom" TYPE geometry`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5992021704d1f0c0c8b53d864d" ON "hotel" USING GiST ("coordinates") `, undefined);
        await queryRunner.query(`ALTER TABLE "hotel_like" ADD CONSTRAINT "FK_31f123ebae82bbe96036e5dd849" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "hotel_like" ADD CONSTRAINT "FK_dcec1605a3fc44263eded174ae5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_21a6e42d6748767b7898d7f403c" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "venue_seating" ADD CONSTRAINT "FK_b69595f622a6cab8a1f62c70153" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4f991220b327c78efa0ea116221" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "saved" ADD CONSTRAINT "FK_920dd054f0294f7a36ba136151f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD CONSTRAINT "FK_49b8d28975e3bdacf93f5aad1f9" FOREIGN KEY ("organizerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD CONSTRAINT "FK_37c0bff49005f1825f7a59cea8b" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP CONSTRAINT "FK_37c0bff49005f1825f7a59cea8b"`, undefined);
        await queryRunner.query(`ALTER TABLE "event_entity" DROP CONSTRAINT "FK_49b8d28975e3bdacf93f5aad1f9"`, undefined);
        await queryRunner.query(`ALTER TABLE "saved" DROP CONSTRAINT "FK_920dd054f0294f7a36ba136151f"`, undefined);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4f991220b327c78efa0ea116221"`, undefined);
        await queryRunner.query(`ALTER TABLE "venue_seating" DROP CONSTRAINT "FK_b69595f622a6cab8a1f62c70153"`, undefined);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_21a6e42d6748767b7898d7f403c"`, undefined);
        await queryRunner.query(`ALTER TABLE "hotel_like" DROP CONSTRAINT "FK_dcec1605a3fc44263eded174ae5"`, undefined);
        await queryRunner.query(`ALTER TABLE "hotel_like" DROP CONSTRAINT "FK_31f123ebae82bbe96036e5dd849"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5992021704d1f0c0c8b53d864d"`, undefined);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "geom" TYPE geometry(GEOMETRY,0)`, undefined);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "venueId"`, undefined);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "venueId"`, undefined);
        await queryRunner.query(`ALTER TABLE "review" ADD "likesId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "review" ADD "date" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "event_entity"`, undefined);
        await queryRunner.query(`DROP TABLE "saved"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_7019e20b4a9877a9d1ca3ca57d"`, undefined);
        await queryRunner.query(`DROP TABLE "venue"`, undefined);
        await queryRunner.query(`DROP TABLE "venue_seating"`, undefined);
        await queryRunner.query(`DROP TABLE "hotel_like"`, undefined);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_93a4a75e3c4dd798e19f0115bcf" FOREIGN KEY ("likesId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
