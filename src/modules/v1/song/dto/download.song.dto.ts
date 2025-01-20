import { IsNotEmpty } from 'class-validator';

export class DownloadSongDto {
  @IsNotEmpty()
  songId: string;

  quality: number;
}
