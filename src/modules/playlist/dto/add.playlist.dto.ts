import { IsNotEmpty } from 'class-validator';

export class AddToPlaylistBodyDto {
  @IsNotEmpty()
  playlistId: string;

  @IsNotEmpty()
  musicIds: string[];
}
