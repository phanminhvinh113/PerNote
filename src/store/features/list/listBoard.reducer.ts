import * as uuid from "uuid";
import { PayloadAction } from "@reduxjs/toolkit";
import { IBoardPayload } from "../../../types/Payload";
import { setItemToLocalStorage } from "../../../utils/helper";
import { IListBoardSlice } from "./listSlice";
import { NAME_STORE_LOCAL } from "@/utils/constant.app";

class ListReducer {
  public addNewTitleBoard(state: IListBoardSlice, action: PayloadAction<IBoardPayload>) {
    if (!action?.payload.titleBoard) return;

    const _id: string = uuid.v4();
    const keyListCard = _id + NAME_STORE_LOCAL.PREFIX_BOARD_CARDS;
    const keyListColumn = _id + NAME_STORE_LOCAL.PREFIX_BOARD_COLUMNS;

    setItemToLocalStorage(keyListCard, {});
    setItemToLocalStorage(keyListColumn, []);

    state.list.push({
      _id,
      title: action.payload.titleBoard,
    });
  }
}

export default new ListReducer();
