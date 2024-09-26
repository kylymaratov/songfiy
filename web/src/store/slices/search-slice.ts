import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMusic } from 'src/types/music-types';

interface IniitaState {
  query: string;
  searchResult: TMusic[];
}

const initialState: IniitaState = {
  query: '',
  searchResult: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<TMusic[]>) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setQuery, setSearchResult } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
