import { Module } from '@nestjs/common';
import { SearchParser } from './search.parser';
import { ContentParser } from './content.parser';
import { AudioParser } from './audio.praser';
import { Convertion } from 'src/common/utils/convert.util';

@Module({
  imports: [],
  providers: [SearchParser, ContentParser, AudioParser, Convertion],
  exports: [SearchParser, ContentParser, AudioParser, Convertion],
})
export class ParserModule {}
