import { Module } from '@nestjs/common';
import { SearchParser } from './helpers/search.parser';
import { ContentParser } from './helpers/content.parser';
import { AudioParser } from './helpers/audio.praser';
import { ConvertUtil } from '../utils/convert.util';

@Module({
  imports: [],
  providers: [SearchParser, ContentParser, AudioParser, ConvertUtil],
  exports: [SearchParser, ContentParser, AudioParser, ConvertUtil],
})
export class YoutubeParserModule {}
