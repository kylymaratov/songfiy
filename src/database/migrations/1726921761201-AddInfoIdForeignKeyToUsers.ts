import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInfoIdForeignKeyToUsers1726921761201
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE users
          ADD CONSTRAINT fk_user_info
          FOREIGN KEY ("infoId") REFERENCES "user-info"("id")
        `);

    await queryRunner.query(`
          UPDATE users
          SET "infoId" = (SELECT "id" FROM "user-info" WHERE "user-info"."id" = users.id LIMIT 1)
          WHERE "infoId" IS NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP CONSTRAINT fk_user_info`);

    await queryRunner.query(`ALTER TABLE users DROP COLUMN "infoId"`);
  }
}
