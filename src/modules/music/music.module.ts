import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import { MusicCacher } from './utils/music-cacher';
import { TelegramStorage } from '../../storage/telegram.storage';
import { MusicSearcher } from './utils/music.searcher';
import { MusicStatEntity } from 'src/database/entities/music.stat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MusicEntity,
      MusicCacheEntity,
      MusicSourceEntity,
      MusicStatEntity,
    ]),
  ],
  controllers: [MusicController],
  providers: [MusicService, MusicCacher, TelegramStorage, MusicSearcher],
})
export class MusicModule {}
