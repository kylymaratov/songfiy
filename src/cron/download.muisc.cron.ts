import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import { TelegramStorage } from 'src/storage/telegram.storage';
import { ServerLogger } from 'src/server/server.logger';
import { Repository } from 'typeorm';

@Injectable()
export class DownloadMusicCron {
  private logger: ServerLogger = new ServerLogger();

  constructor(
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
    @InjectRepository(MusicSourceEntity)
    private musicSourceRepository: Repository<MusicSourceEntity>,
    @InjectRepository(MusicCacheEntity)
    private musicCacheRepository: Repository<MusicCacheEntity>,

    @Inject() private telegramStorage: TelegramStorage,
  ) {}

  @Cron('*/1 * * * *')
  private async uploadMusicTelegram() {
    try {
      const musics = await this.musicRepository
        .createQueryBuilder('music')
        .leftJoinAndSelect('music.musicSource', 'musicSource')
        .where('musicSource.status = :status', { status: 'created' })
        .orderBy('RANDOM()')
        .limit(1)
        .getMany();

      if (!musics.length) return;

      await this.telegramStorage.uploadMusic(musics[0]);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
