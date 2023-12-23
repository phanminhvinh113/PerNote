// import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";
// import BoardReducer from "./board.reducer";
// import { IBoard } from "@/types/Data.type";

// //
// const KEY_NAME: string = "board";
// // Define a type for the slice state

// //
// // Define the initial state using that type
// const initialState: IBoard = {
//   _id: "",
//   columnOrderIds: [],
//   columns: [],
//   title: "",
//   description: "",
//   memberIds: [],
//   ownerIds: [],
//   type: "public",
// };

// export const boardSlice = createSlice({
//   name: KEY_NAME,
//   initialState,
//   reducers: {
//     updateColumn: BoardReducer.updateColumn,
//     deleteColumn: BoardReducer.deleteColumn,
//     addNewColumn: BoardReducer.addNewColumn,
//     addNewCard: BoardReducer.addNewCard,
//     updateCard: BoardReducer.updateCard,
//     deleteCard: BoardReducer.deleteCard,
//     updateDragColumn: BoardReducer.updateDragColumn,
//     updateDragCard: BoardReducer.updateDragCard,
//   },
// });

// export const {
//   addNewCard,
//   addNewColumn,
//   deleteCard,
//   deleteColumn,
//   updateCard,
//   updateColumn,
//   updateDragCard,
//   updateDragColumn,
// } = boardSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectBoard = (state: RootState) => state?.board;
// //
// export default boardSlice.reducer;
