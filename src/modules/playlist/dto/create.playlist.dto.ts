import { IsNotEmpty } from 'class-validator';

export class CreatePlaylistBodyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  isPrivate: boolean;
}
