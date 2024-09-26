import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddColumnListened1727165221548 implements MigrationInterface {
    name = 'UserAddColumnListened1727165221548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-data" ADD "listenedCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user-data" ADD "listenNow" character varying`);
        await queryRunner.query(`ALTER TABLE "user-info" ADD "about" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-info" DROP COLUMN "about"`);
        await queryRunner.query(`ALTER TABLE "user-data" DROP COLUMN "listenNow"`);
        await queryRunner.query(`ALTER TABLE "user-data" DROP COLUMN "listenedCount"`);
    }

}
