import { IsNotEmpty } from 'class-validator';

export class GetMusicByIdDto {
  @IsNotEmpty()
  musicId: string;
}
