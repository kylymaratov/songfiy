import { IsNotEmpty } from 'class-validator';

export class ListenSongDto {
  @IsNotEmpty()
  songId: string;

  quality: number;
}
