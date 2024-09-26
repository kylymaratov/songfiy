import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMusic } from 'src/types/music-types';

interface IniitaState {
  topMusic: TMusic[];
  mostPlayedMusic: TMusic[];
}

const initialState: IniitaState = {
  topMusic: [],
  mostPlayedMusic: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setTopMusic: (state, action: PayloadAction<TMusic[]>) => {
      state.topMusic = action.payload;
    },
    setMostPlayedMusic: (state, action: PayloadAction<TMusic[]>) => {
      state.mostPlayedMusic = action.payload;
    },
  },
});

export const { setMostPlayedMusic, setTopMusic } = musicSlice.actions;
export const musicReducer = musicSlice.reducer;
