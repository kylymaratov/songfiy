import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class AddPlaylistColumn1727160126031 implements MigrationInterface {
  name = 'AddPlaylistColumn1727160126031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем новый столбец playlistId
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD "playlistId" character varying`,
    );

    // Обновляем существующие записи, заполняя поле playlistId UUID v4
    const playlists = await queryRunner.query(`SELECT id FROM "playlist"`);
    for (const playlist of playlists) {
      const uuid = uuidv4();
      await queryRunner.query(
        `UPDATE "playlist" SET "playlistId" = $1 WHERE id = $2`,
        [uuid, playlist.id],
      );
    }

    // Устанавливаем столбец playlistId как NOT NULL
    await queryRunner.query(
      `ALTER TABLE "playlist" ALTER COLUMN "playlistId" SET NOT NULL`,
    );

    // Удаляем старый PK и добавляем новый
    await queryRunner.query(
      `ALTER TABLE "playlist" DROP CONSTRAINT "PK_538c2893e2024fabc7ae65ad142"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD CONSTRAINT "PK_7641efec1f57e14748fd5b655ee" PRIMARY KEY ("id", "playlistId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат изменений
    await queryRunner.query(
      `ALTER TABLE "playlist" DROP CONSTRAINT "PK_7641efec1f57e14748fd5b655ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "playlistId"`);
  }
}
