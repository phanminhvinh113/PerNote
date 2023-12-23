import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PersistConfig } from "redux-persist";
import AppReducer from "./reducer.app";
import { THEME_MODE } from "../../../utils/constant.app";

const InitialTheme: string = THEME_MODE.Dark;
const KEY_NAME: string = "app";

// Define a type for the slice state
export interface AppSliceType {
  theme: string;
}

// Define the initial state using that type
const initialState: AppSliceType = {
  theme: InitialTheme,
};

export const appSlice = createSlice({
  name: KEY_NAME,
  initialState,
  reducers: {
    toggleTheme: AppReducer.toggleTheme,
  },
});

export const { toggleTheme } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectApp = (state: RootState) => state?.app;
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appPersistConfig: PersistConfig<any> = {
  key: KEY_NAME,
  storage,
};
//
export default appSlice.reducer;
