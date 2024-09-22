import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMusic } from '../../types/music-types';

interface IniitaState {
  playNow: TMusic | null;
  fullScreen: boolean;
}

const initialState: IniitaState = {
  playNow: null,
  fullScreen: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayNow: (state, action: PayloadAction<TMusic>) => {
      state.playNow = action.payload;
    },
    setFullScreen: (state, action: PayloadAction<boolean>) => {
      state.fullScreen = action.payload;
    },
  },
});

export const { setPlayNow, setFullScreen } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
