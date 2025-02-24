import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { YoutubeModule } from 'src/parsers/youtube/youtube.module';

@Module({
  imports: [YoutubeModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
