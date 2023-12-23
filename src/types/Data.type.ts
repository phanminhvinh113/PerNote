import { Active, Collision, UniqueIdentifier } from "@dnd-kit/core";
import { DroppableContainer, RectMap } from "@dnd-kit/core/dist/store";
import { Coordinates } from "@dnd-kit/utilities";

export type Id = string | number;
export type IDate = {
  timestamp: number | string;
  date: string;
};
export interface IDataBoard {
  board: IBoard;
}

export type IListCard = {
  [key: UniqueIdentifier]: ICard[];
};
export interface IBoard {
  _id: UniqueIdentifier;
  title: string;
  description: string;
  type: string;
  ownerIds: unknown[];
  memberIds: unknown[];
  columnOrderIds: UniqueIdentifier[];
  columns: IColumn[];
}

export type IColumn = {
  _id: UniqueIdentifier;
  title: string;
  boardId: UniqueIdentifier;
  cards: ICard[];
};

export type ICard = {
  _id: UniqueIdentifier;
  boardId: string;
  columnId: UniqueIdentifier;
  description: string | null;
  title: string;
  cover: string | undefined | null;
  memberIds: string[];
  comments: string[];
  attachments: string[];
  createdDate: IDate | null;
};

export enum Type {
  COLUMN = "Column",
  CARD = "Card",
}

export type IRect = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};
export type TypeElementMenu = {
  title: string;
  icon: React.ReactNode;
  component?: React.ReactNode;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method?: (...args: any[]) => any;
};
export type ICoverTemplate = {
  title: string;
  url: string;
  type: string;
  default: boolean;
};
export type CollisionDetection = (args: {
  active: Active;
  collisionRect: ClientRect;
  droppableRects: RectMap;
  droppableContainers: DroppableContainer[];
  pointerCoordinates: Coordinates | null;
}) => Collision[];
