import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/app-slice";
import { userReducer } from "./slices/user-slice";
import { playerReducer } from "./slices/player-slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
        player: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
