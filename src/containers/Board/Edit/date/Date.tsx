import { FC } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Calendar from "./Calender";
import RangDate from "./time/RangeTime";
import DueDateReminder from "./DueDateReminder";
import DateProvider from "../context/DateContext";
import { SELECT_DATE_FOR } from "@/utils/constant.app";

interface DateProps {}

const Date: FC<DateProps> = () => {
  return (
    <DateProvider>
      <Container>
        <Header title="Dates" />
        <Calendar />
        <RangDate type={SELECT_DATE_FOR.start_date} />
        <RangDate type={SELECT_DATE_FOR.due_date} />
        <DueDateReminder />
      </Container>
    </DateProvider>
  );
};

export default Date;

const Container = styled.div`
  background-color: #282e33;
  border-radius: 8px;
  box-shadow: 0 8px 12px #091e4226;
  overflow: hidden;
  width: 330px;
  padding: 12px;
  max-height: 96vh;
  overflow: overlay;
`;
