import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ListenSongDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  songId: string;

  @ApiProperty({
    default: 'high',
  })
  quality: number;
}
