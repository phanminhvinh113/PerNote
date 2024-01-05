import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import ListReducer from "./listBoard.reducer";
import { PersistConfig } from "redux-persist";

//
const KEY_NAME: string = "list_board";
// Define a type for the slice state
export interface IListSliceType {
  _id: string;
  title: string;
}

export interface IListBoardSlice {
  list: IListSliceType[];
}
// Define the initial state using that type
const initialState: IListBoardSlice = {
  list: [],
};

export const listSlice = createSlice({
  name: KEY_NAME,
  initialState,
  reducers: {
    addNewTitleBoard: ListReducer.addNewTitleBoard,
  },
});

export const { addNewTitleBoard } = listSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectList = (state: RootState) => state?.listBoard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const listPersistConfig: PersistConfig<any> = {
  key: KEY_NAME,
  storage,
};
//
export default listSlice.reducer;
