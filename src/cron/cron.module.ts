import { Module } from '@nestjs/common';
import { DownloadMusicCron } from './download.muisc.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      MusicEntity,
      MusicSourceEntity,
      MusicCacheEntity,
    ]),
  ],
  providers: [DownloadMusicCron],
})
export class CronModule {}
