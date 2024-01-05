import { createContext, FC, ReactNode, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { SELECT_DATE_FOR } from "@/utils/constant.app";

interface DateProviderProps {
  children: ReactNode;
}

interface DateContextProps {
  currentDate: Dayjs;
  selectedDateStart: Dayjs;
  selectedDateDue: Dayjs;
  setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setSelectedDateStart: React.Dispatch<React.SetStateAction<Dayjs>>;
  setSelectedDateDue: React.Dispatch<React.SetStateAction<Dayjs>>;
  timeStart: ITime;
  setTimeStart: React.Dispatch<React.SetStateAction<ITime>>;
  timeDue: ITime;
  setTimeDue: React.Dispatch<React.SetStateAction<ITime>>;
  isCheckedStart: boolean;
  setIsCheckedStart: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckedDue: boolean;
  setIsCheckedDue: React.Dispatch<React.SetStateAction<boolean>>;
  selectDateFor: string;
  setSelectDateFor: React.Dispatch<React.SetStateAction<string>>;
}
interface ITime {
  hour: string;
  minute: string;
  period: string;
}
const initTime: ITime = {
  hour: dayjs().format("hh"),
  minute: dayjs().format("mm"),
  period: dayjs().format("A"),
};

export const DateContext = createContext<DateContextProps | undefined>(undefined);

const DateProvider: FC<DateProviderProps> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const [selectedDateStart, setSelectedDateStart] = useState<Dayjs>(dayjs());
  const [selectedDateDue, setSelectedDateDue] = useState<Dayjs>(dayjs());

  const [timeStart, setTimeStart] = useState<ITime>(initTime);
  const [timeDue, setTimeDue] = useState<ITime>(initTime);
  const [isCheckedStart, setIsCheckedStart] = useState<boolean>(true);
  const [isCheckedDue, setIsCheckedDue] = useState<boolean>(false);
  const [selectDateFor, setSelectDateFor] = useState<string>(SELECT_DATE_FOR.start_date);

  const value: DateContextProps = {
    currentDate,
    selectedDateStart,
    selectedDateDue,
    setCurrentDate,
    setSelectedDateStart,
    setSelectedDateDue,
    timeStart,
    setTimeStart,
    timeDue,
    setTimeDue,
    isCheckedStart,
    setIsCheckedStart,
    isCheckedDue,
    setIsCheckedDue,
    selectDateFor,
    setSelectDateFor,
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export default DateProvider;
