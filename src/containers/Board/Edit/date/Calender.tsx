import { FC, useCallback, useMemo } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import useDateContext from "../hooks/useDateContext";
import { SELECT_DATE_FOR } from "@/utils/constant.app";

interface CalendarProps {
  className?: string;
}

interface DayProps {
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  isSelected: boolean;
}

const Calendar: FC<CalendarProps> = ({ className }) => {
  const {
    currentDate,
    selectedDateStart,
    setCurrentDate,
    setSelectedDateStart,
    selectedDateDue,
    setSelectedDateDue,
    selectDateFor,
    isCheckedStart,
    isCheckedDue,
  } = useDateContext();

  const selectedDate = useMemo(() => {
    if (selectDateFor === SELECT_DATE_FOR.start_date) return selectedDateStart;
    if (selectDateFor === SELECT_DATE_FOR.due_date) return selectedDateDue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectDateFor]);

  const handleDayClick = useCallback(
    (day: dayjs.Dayjs) => {
      if (!isCheckedStart && !isCheckedDue) return;

      if (selectDateFor === SELECT_DATE_FOR.start_date && day.isAfter(selectedDateDue) && isCheckedDue) {
        console.log("start after due");
        setSelectedDateDue(day.add(1, "day"));
        setSelectedDateStart(day);
        return;
      }
      if (selectDateFor === SELECT_DATE_FOR.due_date && day.isBefore(selectedDateStart) && isCheckedStart) {
        console.log(" due before start");
        setSelectedDateStart(day.subtract(1, "day"));
        setSelectedDateDue(day);
        return;
      }

      if (selectDateFor === SELECT_DATE_FOR.start_date && isCheckedStart) return setSelectedDateStart(day);

      if (selectDateFor === SELECT_DATE_FOR.due_date && isCheckedDue) return setSelectedDateDue(day);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectDateFor, isCheckedStart, isCheckedDue, selectedDateDue, selectedDateStart]
  );

  const getDaysInMonth = (date: dayjs.Dayjs) => {
    const firstDay = date.startOf("month");
    const lastDay = date.endOf("month");
    const daysInMonth = Array.from({ length: lastDay.diff(firstDay, "days") + 1 }, (_, index) =>
      firstDay.add(index, "days")
    );
    return daysInMonth;
  };

  const getWeekdays = (date: dayjs.Dayjs) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startDayIndex = date.startOf("month").day();
    return weekdays.slice(startDayIndex).concat(weekdays.slice(0, startDayIndex));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => prevDate.add(1, "month"));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => prevDate.subtract(1, "month"));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const weekdays = getWeekdays(currentDate);

  return (
    <CalendarContainer className={className}>
      <Header>
        <button onClick={handlePrevMonth}>&lt; Prev</button>
        {currentDate.format("MMMM YYYY")}
        <button onClick={handleNextMonth}>Next &gt;</button>
      </Header>
      <Weekdays>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))}
      </Weekdays>
      <Days>
        {daysInMonth.map((day) => (
          <Day
            key={day.toString()}
            isCurrentMonth={day.isSame(currentDate, "month")}
            isCurrentDay={day.isSame(dayjs(), "day")}
            isSelected={selectedDate ? day.isSame(selectedDate, "day") : false}
            onClick={() => handleDayClick(day)}
          >
            {day.format("D")}
          </Day>
        ))}
      </Days>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

const Weekdays = styled.div`
  display: flex;
  //background-color: #ffffff29;
`;

const Weekday = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Day = styled.div<DayProps>`
  border-radius: 50%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isCurrentMonth ? (props.isSelected ? "#b3e0ff" : props.isCurrentDay ? "#8d8968" : "inherit") : "#f9f9f9"};
  font-weight: ${(props) => (props.isCurrentDay ? "bold" : "normal")};

  &:hover {
    background-color: ${(props) => (props.isCurrentMonth ? "#e0e0e0" : "#f9f9f9")};
  }
`;
