import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IniitaState {
  isAuth: boolean;
}

const initialState: IniitaState = {
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
