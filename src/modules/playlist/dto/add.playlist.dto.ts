import { IsNotEmpty } from 'class-validator';

export class AddToPlaylistBodyDto {
  @IsNotEmpty()
  playlistId: number;

  @IsNotEmpty()
  musicIds: string[];
}
