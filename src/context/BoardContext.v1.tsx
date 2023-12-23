/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FunctionComponent, SetStateAction, createContext } from "react";
import { IColumn } from "../types/Data.type";
import { useParams } from "react-router-dom";
import Board from "@/containers/Board/Board.index";
import { UniqueIdentifier } from "@dnd-kit/core";
import * as uuid from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage";

import { useAppDispatch } from "@/store/hooks";
import { setCardIdSelect } from "@/store/features/card/cardSlice";

import { getDateFormat } from "@/utils/repo";
//
export type typeContext = {
  listColumn: IColumn[];
  createNewColumn: () => void;
  setListColumn: Dispatch<SetStateAction<IColumn[]>>;
  updateTitleColumn: (columnId: UniqueIdentifier, value: string) => void;
  deleteColumn: (columnId: UniqueIdentifier) => void;
  createNewCard: (columnId: UniqueIdentifier) => void;
  updateCard: (columnId: UniqueIdentifier, cardId: UniqueIdentifier, value: string) => void;
  deleteCard: (columnId: UniqueIdentifier, cardId: UniqueIdentifier) => void;
  updateCoverCard: (columnId: UniqueIdentifier, cardId: UniqueIdentifier, cover: string) => void;
  removeCoverCard: (columnId: UniqueIdentifier, cardId: UniqueIdentifier) => void;
};
export const BoardContext = createContext<typeContext | undefined>(undefined);
//
interface IState {
  listColumn: IColumn[];
  listOrderId: UniqueIdentifier[];
}
//

//
interface DragContextProps {}

const BoardContextContainer: FunctionComponent<DragContextProps> = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  //
  const stateInit: IState = {
    listColumn: [],
    listOrderId: [],
  };
  //
  const [listColumn, setListColumn] = useLocalStorage(boardId, stateInit.listColumn);

  const initialValueContext: typeContext = {
    listColumn,
    createNewColumn,
    updateTitleColumn,
    deleteColumn,
    createNewCard,
    updateCard,
    deleteCard,
    setListColumn,
    updateCoverCard,
    removeCoverCard,
  };

  /**
   * Method For Column
   * */

  /*******************************************/

  /**
   *
   * @param title
   * @returns
   */
  function createNewColumn() {
    if (!boardId) return;
    setListColumn((prevColumn) => [
      ...prevColumn,
      {
        _id: uuid.v4(),
        title: "",
        boardId,
        cardOrderIds: [],
        cards: [],
      },
    ]);
  }
  /**
   *
   * @param columnId
   * @param newTitle
   */
  function updateTitleColumn(columnId: UniqueIdentifier, newTitle: string) {
    setListColumn((columns) =>
      columns.map((column) => (column._id == columnId ? { ...column, title: newTitle } : column))
    );
  }
  /**
   *
   * @param columnId
   * @returns
   */
  function deleteColumn(columnId: UniqueIdentifier) {
    const confirm = window.confirm("Do you want to delete!");
    if (!confirm) return;
    setListColumn((columns) => columns.filter((column) => column._id !== columnId));
  }

  /**
   * METHOD FOR CARD
   *
   */

  /***************************************/

  function createNewCard(columnId: UniqueIdentifier) {
    if (!boardId) return;

    setListColumn((columns) =>
      columns.map((column) => {
        if (column._id === columnId) {
          const _id = uuid.v4();
          column.cards = [
            ...column.cards,
            {
              _id,
              boardId,
              columnId,
              title: "  ",
              description: null,
              cover: null,
              memberIds: [],
              comments: [],
              attachments: [],
              createdDate: {
                date: getDateFormat(),
                timestamp: Date.now(),
              },
            },
          ];

          dispatch(setCardIdSelect(_id));
        }
        return column;
      })
    );
  }

  /**
   *
   * @param columnId
   * @param cardId
   * @param newTitleCard
   */
  function updateCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier, newTitleCard: string) {
    setListColumn((columns) => {
      console.log("before", { listColumn });
      return columns.map((column) => {
        if (column._id !== columnId) return column;
        console.log({ columns });
        column.cards = column.cards.map((card) => (card._id === cardId ? { ...card, title: newTitleCard } : card));
        return column;
      });
    });
  }
  /**
   *
   * @param columnId
   * @param cardId
   */
  function deleteCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier) {
    setListColumn((columns) =>
      columns.map((column) => {
        if (column._id !== columnId) return column;
        column.cards = column.cards.filter((card) => card._id !== cardId);
        return column;
      })
    );
  }

  /**
   *
   * @param columnId
   * @param cardId
   * @param cover
   */

  function updateCoverCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier, cover: string) {
    setListColumn((columns) =>
      columns.map((column) => {
        if (column._id !== columnId) return column;
        column.cards = column.cards.map((card) => (card._id === cardId ? { ...card, cover } : card));
        return column;
      })
    );
  }
  function removeCoverCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier) {
    console.log({ columnId, cardId });
    setListColumn((columns) =>
      columns.map((column) => {
        if (column._id !== columnId) return column;
        column.cards = column.cards.map((card) => (card._id === cardId ? { ...card, cover: null } : card));
        return column;
      })
    );
  }

  return (
    <BoardContext.Provider value={initialValueContext}>
      <Board />
    </BoardContext.Provider>
  );
};

export default BoardContextContainer;
