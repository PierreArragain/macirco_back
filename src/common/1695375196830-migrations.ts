import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1695375196830 implements MigrationInterface {
  name = 'Migrations1695375196830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parliamentary_group_entity" ("idParliamentaryGroup" SERIAL NOT NULL, "name" text, "acronym" text, "logo" text, CONSTRAINT "PK_910343d4c55ee38e6b9f7a5a5ec" PRIMARY KEY ("idParliamentaryGroup"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mp_entity" ("idMp" SERIAL NOT NULL, "surname" text NOT NULL, "firstName" text NOT NULL, "gender" text NOT NULL, "party" text, "profession" text, "picture" text, "inActivity" boolean NOT NULL DEFAULT true, "link" text, "email" text, "nosDeputesSlug" text, "parliamentaryGroupIdParliamentaryGroup" integer, CONSTRAINT "PK_c244a5c8692a1d3932eba4d5860" PRIMARY KEY ("idMp"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "constituency_entity" ("idConstituency" SERIAL NOT NULL, "department" text, "code" text NOT NULL, "polygon" geometry(Polygon,4326), "mpIdMp" integer, CONSTRAINT "PK_89ee5c54c94d1ed90dc00e6145a" PRIMARY KEY ("idConstituency"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "mp_entity" ADD CONSTRAINT "FK_7aaa88b3a7ea701f7fcc34489f4" FOREIGN KEY ("parliamentaryGroupIdParliamentaryGroup") REFERENCES "parliamentary_group_entity"("idParliamentaryGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "constituency_entity" ADD CONSTRAINT "FK_0f7beb465de1024371db55d30e1" FOREIGN KEY ("mpIdMp") REFERENCES "mp_entity"("idMp") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "constituency_entity" DROP CONSTRAINT "FK_0f7beb465de1024371db55d30e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mp_entity" DROP CONSTRAINT "FK_7aaa88b3a7ea701f7fcc34489f4"`,
    );
    await queryRunner.query(`DROP TABLE "constituency_entity"`);
    await queryRunner.query(`DROP TABLE "mp_entity"`);
    await queryRunner.query(`DROP TABLE "parliamentary_group_entity"`);
  }
}
