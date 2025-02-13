import { Module } from '@nestjs/common';
//
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { YoutubeParserModule } from 'src/parsers/ytb-parser';

@Module({
  imports: [YoutubeParserModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
