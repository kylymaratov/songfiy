import { IsNotEmpty } from 'class-validator';

export class GetMusicByIdParamDto {
  @IsNotEmpty()
  musicId: string;
}
