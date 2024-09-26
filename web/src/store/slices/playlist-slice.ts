import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TPlaylist {
  id: number;
  playlistId: string;
  name: string;
  musicIds: string[];
  listenCount: number;
  likes: number;
  isPrivate: boolean;
  created: string;
  updated: string;
}

interface IniitaState {
  myPlaylists: TPlaylist[];
}

const initialState: IniitaState = { myPlaylists: [] };

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setMyPlaylists: (state, action: PayloadAction<TPlaylist[]>) => {
      state.myPlaylists = action.payload;
    },
  },
});

export const { setMyPlaylists } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
