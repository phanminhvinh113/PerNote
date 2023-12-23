export type Id = string | number;

export type IColumn = {
  id: Id;
  title: string;
};

export type ICard = {
  id: Id;
  columnId: string | number;
  content: string;
  imageUrl?: string;
};

export enum Type {
  COLUMN = "Column",
  CARD = "Card",
}
