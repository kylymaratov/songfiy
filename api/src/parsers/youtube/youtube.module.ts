import { Module } from '@nestjs/common';
import { ContentParser } from './helpers/content.parser';
import { AudioParser } from './helpers/audio.praser';
import { ConvertUtil } from 'src/common/utils/convert.util';
import { SearchParser } from './helpers/search.parser';

@Module({
  imports: [],
  providers: [SearchParser, ContentParser, AudioParser, ConvertUtil],
  exports: [SearchParser, ContentParser, AudioParser, ConvertUtil],
})
export class YoutubeModule {}
