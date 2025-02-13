import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsNotEmpty } from 'class-validator';

export class SearchSongsDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsByteLength(3, 50)
  query: string;

  @ApiProperty({ default: 10, required: false })
  limit: number;
}
