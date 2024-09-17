import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MusicEntity,
      MusicCacheEntity,
      MusicSourceEntity,
    ]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
