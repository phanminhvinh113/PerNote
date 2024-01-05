import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import dayjs from "dayjs";

//
const KEY_NAME: string = "date";
// Define a type for the slice state
export interface IDateSliceType {
  isCheckedStartDate: boolean;
  isCheckedDueDate: boolean;
  currentDate: string;
  selectedDate: string;
  selectedHour: string;
  selectedMinute: string;
  selectedPeriod: string;
}

// Define the initial state using that type
const initialState: IDateSliceType = {
  isCheckedDueDate: false,
  isCheckedStartDate: true,
  currentDate: dayjs().format("DD/MM/YYYY"),
  selectedDate: dayjs().format("DD/MM/YYYY"),
  selectedHour: "12",
  selectedMinute: "00",
  selectedPeriod: "AM",
};

export const dateSlice = createSlice({
  name: KEY_NAME,
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    setSelectedHour: (state, action: PayloadAction<string>) => {
      state.selectedHour = action.payload;
    },
    setSelectedMinute: (state, action: PayloadAction<string>) => {
      state.selectedMinute = action.payload;
    },
    setSelectedPeriod: (state, action: PayloadAction<string>) => {
      state.selectedPeriod = action.payload;
    },
    setCheckedStartDate: (state, action: PayloadAction<boolean>) => {
      state.isCheckedStartDate = action.payload;
    },
    setCheckedDueDate: (state, action: PayloadAction<boolean>) => {
      state.isCheckedDueDate = action.payload;
    },
  },
});

export const {
  setSelectedDate,
  setCurrentDate,
  setSelectedHour,
  setSelectedMinute,
  setSelectedPeriod,
  setCheckedDueDate,
  setCheckedStartDate,
} = dateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDate = (state: RootState) => state?.date;
//
export default dateSlice.reducer;
