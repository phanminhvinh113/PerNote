/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FunctionComponent, SetStateAction, createContext } from "react";
import { ICard, IColumn } from "../types/Data.type";
import { useParams } from "react-router-dom";
import Board from "@/containers/Board/Board.index";
import { UniqueIdentifier } from "@dnd-kit/core";
import * as uuid from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage";

import { useAppDispatch } from "@/store/hooks";
import { setCardIdSelect } from "@/store/features/card/cardSlice";

import { getDateFormat } from "@/utils/repo";
import { NAME_STORE_LOCAL } from "@/utils/constant.app";

//
export type typeContext = {
  listColumn: IColumn[];
  listCard: IListCard;
  setListColumn: Dispatch<SetStateAction<IColumn[]>>;
  setListCard: Dispatch<SetStateAction<IListCard>>;
  createNewColumn: () => void;
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
type IListCard = {
  [key: UniqueIdentifier]: ICard[];
};
interface IState {
  listColumn: IColumn[];
  listCard: IListCard;
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
    listCard: {},
  };

  const [listColumn, setListColumn] = useLocalStorage(
    boardId + NAME_STORE_LOCAL.PREFIX_BOARD_COLUMNS,
    stateInit.listColumn
  );

  const [listCard, setListCard] = useLocalStorage(boardId + NAME_STORE_LOCAL.PREFIX_BOARD_CARDS, stateInit.listCard);

  const initialValueContext: typeContext = {
    listColumn,
    listCard,
    setListCard,
    setListColumn,
    createNewColumn,
    updateTitleColumn,
    deleteColumn,
    createNewCard,
    updateCard,
    deleteCard,
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

    const columnId = uuid.v4();

    setListColumn((prevColumn) => [
      ...prevColumn,
      {
        _id: columnId,
        title: "",
        boardId,
        cardOrderIds: [],
        cards: [],
      },
    ]);

    setListCard((cards) => ({ ...cards, [columnId]: [] }));
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
    const _id = uuid.v4();
    setListCard((cards) => {
      const list = cards[columnId];

      if (!list) return cards;

      list.push({
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
      });

      return { ...cards, [columnId]: list };
    });

    dispatch(setCardIdSelect(_id));
  }

  function updateCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier, newTitleCard: string) {
    setListCard((cards) => ({
      ...cards,
      [columnId]: (cards[columnId] || []).map((card) =>
        card._id === cardId ? { ...card, title: newTitleCard } : card
      ),
    }));
  }

  function deleteCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier) {
    setListCard((cards) => ({
      ...cards,
      [columnId]: (cards[columnId] || []).filter((card) => card._id !== cardId),
    }));
  }

  function updateCoverCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier, cover: string) {
    setListCard((cards) => ({
      ...cards,
      [columnId]: (cards[columnId] || []).map((card) => (card._id === cardId ? { ...card, cover } : card)),
    }));
  }

  function removeCoverCard(columnId: UniqueIdentifier, cardId: UniqueIdentifier) {
    setListCard((cards) => ({
      ...cards,
      [columnId]: (cards[columnId] || []).map((card) => (card._id === cardId ? { ...card, cover: null } : card)),
    }));
  }

  return (
    <BoardContext.Provider value={initialValueContext}>
      <Board />
    </BoardContext.Provider>
  );
};

export default BoardContextContainer;
