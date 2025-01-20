import { Module } from '@nestjs/common';
import { SearchParser } from './search.parser';
import { ContentParser } from './content.parser';
import { AudioParser } from './audio.praser';
import { ConvertUtil } from 'src/common/utils/convert.util';

@Module({
  imports: [],
  providers: [SearchParser, ContentParser, AudioParser, ConvertUtil],
  exports: [SearchParser, ContentParser, AudioParser, ConvertUtil],
})
export class ParserModule {}
