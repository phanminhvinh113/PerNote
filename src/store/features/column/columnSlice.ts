import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

//
const KEY_NAME: string = "column";
// Define a type for the slice state
export interface IColumnSliceType {
  isNewColumn: boolean;
  isDisableDragColumn: boolean;
}
//
// Define the initial state using that type
const initialState: IColumnSliceType = {
  isNewColumn: false,
  isDisableDragColumn: false,
};

export const columnSlice = createSlice({
  name: KEY_NAME,
  initialState,
  reducers: {
    setIsNewColumn: (state, action: PayloadAction<boolean>) => {
      state.isNewColumn = action.payload;
    },
    setIsDisableDragColumn: (state, action: PayloadAction<boolean>) => {
      state.isDisableDragColumn = action.payload;
    },
  },
});

export const { setIsNewColumn, setIsDisableDragColumn } = columnSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectColumn = (state: RootState) => state?.column;
//
export default columnSlice.reducer;
