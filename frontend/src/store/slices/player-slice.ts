import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/track-types";

interface IniitaState {
    playNow?: ITrack | null;
}

const initialState: IniitaState = {
    playNow: null,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setPlayNows: (state, action: PayloadAction<ITrack>) => {
            state.playNow = action.payload;
        },
    },
});

export const { setPlayNows } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
