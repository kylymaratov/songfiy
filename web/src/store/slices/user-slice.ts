import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TUserInfo {
  id: number;
  birthday: null | string;
  avatar: null | string;
  firstname: null | string;
  lastname: null | string;
  about: null | string;
}

export interface TUser {
  id: number;
  email: string;
  verfifed: boolean;
  created: string;
  updated: string;
  info?: TUserInfo;
}

interface IniitaState {
  isAuth: boolean;
  checkingSession: boolean;
  user: TUser | null;
}

const initialState: IniitaState = {
  isAuth: false,
  user: null,
  checkingSession: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<TUserInfo>) => {
      if (state.user) {
        state.user = { ...state.user, info: action.payload };
      }
    },
    setCheckingSession: (state, aciton: PayloadAction<boolean>) => {
      state.checkingSession = aciton.payload;
    },
  },
});

export const { setAuth, setUser, setUserInfo, setCheckingSession } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
