import { IsNotEmpty } from 'class-validator';

export class SearchMusicDto {
  @IsNotEmpty()
  query: string;

  limit: number;
}
