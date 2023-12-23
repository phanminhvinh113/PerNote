import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ICard, IRect } from "@/types/Data.type";
import { initRect } from "@/utils/constant.app";

//
const KEY_NAME: string = "card";
// Define a type for the slice state
export interface ICardSliceType {
  isEditCard: boolean;
  isNewCard: boolean;
  card_id: UniqueIdentifier | null;
  card_select: ICard;
  rect_card: IRect;
}
//
const initCard = {
  _id: "",
  boardId: "",
  columnId: "",
  description: null,
  title: "",
  cover: undefined,
  memberIds: [],
  comments: [],
  attachments: [],
  createdDate: null,
};
// Define the initial state using that type
const initialState: ICardSliceType = {
  isEditCard: false,
  isNewCard: false,
  card_id: null,
  card_select: initCard,
  rect_card: initRect,
};

export const cardSlice = createSlice({
  name: KEY_NAME,
  initialState,
  reducers: {
    setIsCardEdit: (state, action: PayloadAction<boolean>) => {
      state.isEditCard = action.payload;
    },
    setIsNewCard: (state, action: PayloadAction<boolean>) => {
      state.isNewCard = action.payload;
    },
    setCardIdSelect: (state, action: PayloadAction<UniqueIdentifier>) => {
      state.card_id = action.payload;
    },
    setCardSelect: (state, action: PayloadAction<ICard>) => {
      state.card_select = action.payload;
    },
    setRectCard: (state, action: PayloadAction<IRect>) => {
      state.rect_card = action.payload;
    },
  },
});

export const { setIsNewCard, setCardIdSelect, setIsCardEdit, setCardSelect, setRectCard } = cardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (state: RootState) => state?.card;
//
export default cardSlice.reducer;
