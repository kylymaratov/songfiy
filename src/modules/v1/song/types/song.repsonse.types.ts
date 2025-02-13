import { SongTypes } from './song.types';

export interface SearchSongsResponse {
  title: string;
  songs: SongTypes[];
}
