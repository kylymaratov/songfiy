import { Module } from '@nestjs/common';
//
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { ParserModule } from 'src/common/helpers/parser/parser.module';
import { apiEnv } from 'src/common/settings/api.env';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [ParserModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
