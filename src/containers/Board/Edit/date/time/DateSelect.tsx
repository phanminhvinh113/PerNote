import { Dayjs } from "dayjs";
import { FC, Fragment, useCallback, useMemo } from "react";
import styled from "styled-components";
import useDateContext from "../../hooks/useDateContext";
import { SELECT_DATE_FOR } from "@/utils/constant.app";

interface DateSelectProps {
  isChecked: boolean;
  selectedDate: Dayjs | null;
  type: string;
}

const DateSelect: FC<DateSelectProps> = ({ isChecked, selectedDate, type }) => {
  const { isCheckedDue, isCheckedStart, setSelectDateFor, selectedDateDue, selectedDateStart } = useDateContext();

  const value = useMemo(() => {
    if (!isChecked) return "";

    if (
      type === SELECT_DATE_FOR.start_date &&
      isCheckedDue &&
      selectedDateDue &&
      selectedDateStart.isAfter(selectedDateDue)
    )
      return selectedDateDue.subtract(1, "day").format("DD/MM/YYYY");

    if (
      type === SELECT_DATE_FOR.due_date &&
      isCheckedStart &&
      selectedDateStart &&
      selectedDateDue.isBefore(selectedDateStart)
    )
      return selectedDateStart.add(1, "day").format("DD/MM/YYYY");

    return selectedDate?.format("DD/MM/YYYY");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, selectedDate]);

  const handleSelectDateFor = useCallback(() => {
    if (type === SELECT_DATE_FOR.start_date && isCheckedStart) return setSelectDateFor(SELECT_DATE_FOR.start_date);
    if (type === SELECT_DATE_FOR.due_date && isCheckedDue) return setSelectDateFor(SELECT_DATE_FOR.due_date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedDue, isCheckedStart, type]);

  return (
    <Fragment>
      <Input
        onClick={handleSelectDateFor}
        isPermission={isChecked}
        type="text"
        value={value}
        placeholder="DD/MM/yyyy"
        readOnly
      />
    </Fragment>
  );
};

export default DateSelect;

const Input = styled.input<{ isPermission: boolean }>`
  cursor: ${(props) => (props.isPermission ? "pointer" : "not-allowed")};
  background-color: #22272b;
  box-shadow: inset 0 0 0 2px #85b8ff;
  width: 115px;
  margin: 0;
  padding: 6px;
  outline: none;
  border: none;
  box-sizing: border-box;
  color: #b6c2cf;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-display: swap;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  border-radius: 3px;
`;
