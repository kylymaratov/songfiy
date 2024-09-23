import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TSettings {
  language: 'en' | 'ru' | 'kg';
}

interface IniitaState {
  darkMode: boolean;
  settings: TSettings;
  showSettings: boolean;
  currentLocation: string;
  searchFocus: boolean;
}

const initialState: IniitaState = {
  darkMode: true,
  currentLocation: '',
  settings: {
    language: 'en',
  },
  searchFocus: false,
  showSettings: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },

    setCurrentLocation: (state, action: PayloadAction<string>) => {
      state.currentLocation = action.payload;
    },
    setSearchFocus: (state, action: PayloadAction<boolean>) => {
      state.searchFocus = action.payload;
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setCurrentLocation,
  setSearchFocus,
  setShowSettings,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
