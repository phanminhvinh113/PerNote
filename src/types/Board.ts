import { ICard, IColumn } from "./Column";

export interface IBoard {
  _id: string;
  titleBoard?: string;
  listColumns: IColumn[];
  listCards: ICard[];
}
