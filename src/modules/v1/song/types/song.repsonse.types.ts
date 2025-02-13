import { SongTypes } from './song.types';

export interface SearchSongsResponse {
  title: string;
  songs: SongTypes[];
}

export interface TrendingSongsRepsonse {
  title: string;
  songs: SongTypes[];
}
