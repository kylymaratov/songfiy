import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slices/app-slice';
import { userReducer } from './slices/user-slice';
import { playerReducer } from './slices/player-slice';
import { searchReducer } from './slices/search-slice';
import { playlistReducer } from './slices/playlist-slice';
import { musicReducer } from './slices/music-slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    player: playerReducer,
    search: searchReducer,
    playlist: playlistReducer,
    music: musicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
