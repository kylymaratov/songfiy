import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IniitaState {
    darkMode: boolean;
    openFloatMenu: boolean;
    currentLocation: string;
}

const initialState: IniitaState = {
    darkMode: true,
    openFloatMenu: false,
    currentLocation: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        setOpenFloatMenu: (state, action: PayloadAction<boolean>) => {
            state.openFloatMenu = action.payload;
        },
        setCurrentLocation: (state, action: PayloadAction<string>) => {
            state.currentLocation = action.payload;
        },
    },
});

export const { setDarkMode, setOpenFloatMenu, setCurrentLocation } =
    appSlice.actions;
export const appReducer = appSlice.reducer;
