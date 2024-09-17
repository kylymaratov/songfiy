import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITrack } from '../../types/track-types';
import { track_mock } from 'src/mocks/track-mock';

interface IniitaState {
  playNow?: ITrack | null;
}

const initialState: IniitaState = {
  playNow: track_mock,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayNows: (state, action: PayloadAction<ITrack>) => {
      state.playNow = action.payload;
    },
  },
});

export const { setPlayNows } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
