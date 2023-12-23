import { Id } from "./Column";

//
export interface IColumnPayLoad {
  boardId: string;
  title: string;
}

export interface IBoardPayload {
  titleBoard: string;
}

export interface ICardPayLoad {
  boardId: string;
  columnId: Id;
  content: string;
  imageUrl?: string;
}
