import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLikesTypes1727159604179 implements MigrationInterface {
    name = 'ChangeLikesTypes1727159604179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_user_info"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "likes" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_74e49ef096dd8207ae49d4a3d29"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "infoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "music-statistic" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "music-statistic" ADD "likes" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_74e49ef096dd8207ae49d4a3d29" FOREIGN KEY ("infoId") REFERENCES "user-info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_74e49ef096dd8207ae49d4a3d29"`);
        await queryRunner.query(`ALTER TABLE "music-statistic" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "music-statistic" ADD "likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "infoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_74e49ef096dd8207ae49d4a3d29" FOREIGN KEY ("infoId") REFERENCES "user-info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_user_info" FOREIGN KEY ("infoId") REFERENCES "user-info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
