import { IsByteLength, IsNotEmpty } from 'class-validator';

export class SearchSongsDto {
  @IsNotEmpty()
  @IsByteLength(3, 50)
  query: string;

  limit: number;
}
