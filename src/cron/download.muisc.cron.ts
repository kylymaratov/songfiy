import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import { MusicDownloader } from 'src/helpers/music.downloder';
import { ServerLogger } from 'src/server/server.logger';
import { Repository } from 'typeorm';

@Injectable()
export class DownloadMusicCron {
  private musicDownloader: MusicDownloader = new MusicDownloader();
  private logger: ServerLogger = new ServerLogger();

  constructor(
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
    @InjectRepository(MusicSourceEntity)
    private musicSourceRepository: Repository<MusicSourceEntity>,
    @InjectRepository(MusicCacheEntity)
    private musicCacheRepository: Repository<MusicCacheEntity>,
  ) {}

  @Cron('*/30 * * * * *')
  private async cleanOldCache() {
    try {
      const hoursThreshold = 5;

      const result = await this.musicCacheRepository
        .createQueryBuilder()
        .delete()
        .from(MusicCacheEntity)
        .where('lastAccessed < NOW() - INTERVAL :hours HOUR', {
          hours: hoursThreshold,
        })
        .execute();

      console.log(result);
    } catch (error) {
      this.logger.error('Error while clearing cache', error);
    }
  }

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

      await this.musicDownloader.uploadMusicToTelegram(
        musics[0],
        this.musicSourceRepository,
      );
    } catch (error) {
      this.logger.error('Error while download music', error);
    }
  }
}
