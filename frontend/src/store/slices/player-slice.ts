import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMusic } from '../../types/music-types';

interface IniitaState {
  playNow?: TMusic | null;
}

const initialState: IniitaState = {
  playNow: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayNows: (state, action: PayloadAction<TMusic>) => {
      state.playNow = action.payload;
    },
  },
});

export const { setPlayNows } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
