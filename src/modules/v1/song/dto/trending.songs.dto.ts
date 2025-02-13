import { ApiProperty } from '@nestjs/swagger';

export class TrendingSongsDto {
  @ApiProperty({ required: true, default: 'en' })
  regionCode: string;

  @ApiProperty({ default: 10, required: false })
  limit: number;
}
