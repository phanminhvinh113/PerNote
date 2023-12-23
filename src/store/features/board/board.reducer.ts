// import * as uuid from "uuid";
// import { PayloadAction } from "@reduxjs/toolkit";
// import { ICard, IColumn } from "@/types/Column";
// import { ICardPayLoad, IColumnPayLoad } from "@/types/Payload";
// import { IBoard } from "@/types/Data.type";
// import { getItemInLocalStorage } from "@/utils/helper";

// class BoardReducer {
//   public fetchDataBoard(state: IBoard, action: PayloadAction<{ boardId: string }>) {
//     const { boardId } = action.payload;
//     if (!boardId) return state;

//     const data = getItemInLocalStorage(boardId);

//     if (!data) return state;
//     return data;
//   }

//   public addNewColumn(state: IBoard, action: PayloadAction<IColumnPayLoad>) {
//     const { boardId, title } = action.payload;
//     if (!boardId) return state;
//     state.columns.push({
//       title,
//       _id: action.payload.title + uuid.v4(),
//       boardId,
//       cardOrderIds: [],
//       cards: [],
//     });
//   }

//   public updateColumn(
//     state: IBoard,
//     action: PayloadAction<{ boardId: string; columnId: string | number; newTitle: string }>
//   ) {
//     const { boardId, columnId, newTitle } = action.payload;
//     if (!boardId || !columnId || !newTitle) return state;

//     const columnModify = state?.columns.map((column) =>
//       column._id === columnId ? { ...column, title: newTitle } : column
//     );

//     //updateToLocalStorage(boardId, { ...state, listColumns: columnModify });

//     return { ...state, listColumns: columnModify };
//   }

//   public deleteColumn(state: IBoard, action: PayloadAction<{ boardId: string; columnId: string | number }>) {
//     const { boardId, columnId } = action.payload;
//     if (!boardId || !columnId) return state;

//     return { ...state, listColumns: state.columns?.filter((column) => column._id !== columnId) };
//   }

//   public addNewCard(state: IBoard, action: PayloadAction<ICardPayLoad>) {
//     const { boardId, columnId, content, imageUrl } = action.payload;
//     if (!boardId || !columnId) return;

//     state.columns.map((column) => {
//       if (column._id === columnId) {
//         column.cards.push({
//           _id: column.cards.length + 1,
//           boardId,
//           columnId,
//           attachments: [],
//           comments: [],
//           cover: imageUrl,
//           description: "",
//           memberIds: [],
//           title: content,
//         });
//         return column;
//       }
//     });
//   }

//   public updateCard(
//     state: IBoard,
//     action: PayloadAction<{ boardId: string; cardId: string | number; newContent: string }>
//   ) {
//     const { boardId, cardId, newContent } = action.payload;
//     if (!boardId || !cardId || !newContent) return state;

//     const cardModify = state.listCards?.map((card: ICard) =>
//       card.id === cardId ? { ...card, content: newContent } : card
//     );
//   }

//   public deleteCard(state: IBoard, action: PayloadAction<{ boardId: string; cardId: string | number }>) {
//     const { boardId, cardId } = action.payload;
//     if (!boardId || !cardId) return state;
//     state.listCards?.filter((card) => card.id !== cardId);
//   }

//   public updateDragColumn(state: IBoard, action: PayloadAction<{ boardId: string; columns: IColumn[] }>) {
//     const { columns, boardId } = action.payload;
//     if (!boardId) return state;
//     state.listColumns = columns;
//   }

//   public updateDragCard(state: IBoard, action: PayloadAction<{ boardId: string; cards: ICard[] }>) {
//     const { boardId, cards } = action.payload;

//     if (!boardId) return state;

//     state.listCards = cards;
//     //return { ...state, listCards: cards };

//     //updateToLocalStorage(boardId, state);
//   }
// }

// export default new BoardReducer();
