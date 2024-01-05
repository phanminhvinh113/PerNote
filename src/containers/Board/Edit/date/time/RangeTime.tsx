import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import DateSelect from "./DateSelect";
import TimeSelect from "./TimeSelect";
import useDateContext from "../../hooks/useDateContext";
import { SELECT_DATE_FOR } from "@/utils/constant.app";
import dayjs from "dayjs";

interface StartDateProps {
  type: string;
}

const StartDate: React.FC<StartDateProps> = ({ type }) => {
  const {
    isCheckedStart,
    isCheckedDue,
    setIsCheckedStart,
    setIsCheckedDue,
    selectedDateStart,
    selectedDateDue,
    currentDate,
    setSelectDateFor,
    setSelectedDateStart,
    setSelectedDateDue,
  } = useDateContext();

  const isChecked = useMemo(() => {
    if (type === SELECT_DATE_FOR.start_date) return isCheckedStart;
    if (type === SELECT_DATE_FOR.due_date) return isCheckedDue;

    return false;
  }, [type, isCheckedStart, isCheckedDue]);

  const handleCheckboxChange = useCallback(() => {
    if (type === SELECT_DATE_FOR.start_date) {
      if (!isCheckedStart) {
        setSelectDateFor(SELECT_DATE_FOR.start_date);
      } else {
        setSelectedDateStart(dayjs());
      }
      return setIsCheckedStart((prev) => !prev);
    }

    if (type === SELECT_DATE_FOR.due_date) {
      if (!isCheckedDue) {
        setSelectDateFor(SELECT_DATE_FOR.due_date);
      } else {
        setSelectedDateDue(dayjs());
      }
      return setIsCheckedDue((prev) => !prev);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, isChecked]);
  const selectedDate = useMemo(() => {
    if (type === SELECT_DATE_FOR.start_date) return selectedDateStart;

    if (type === SELECT_DATE_FOR.due_date) return selectedDateDue;

    return currentDate;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, selectedDateDue, selectedDateStart]);

  const title = useMemo(() => {
    if (type === SELECT_DATE_FOR.start_date) return "start date";

    if (type === SELECT_DATE_FOR.due_date) return "due date";
    return "date";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Header title={title} position="left" fontTitle={0.8} />
      <Wrapper>
        <CheckboxLabel>
          <CustomCheckbox type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </CheckboxLabel>
        <DateSelect isChecked={isChecked} selectedDate={selectedDate} type={type} />
        <TimeSelect isChecked={isChecked} selectedDate={selectedDate} type={type} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const CustomCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #3d9ad8;
    border-color: #3498db;
    color: #ebe4e4;

    &::after {
      content: "✔";
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
export default StartDate;
