import React from "react";
import styled from "styled-components";
import { ITime } from "@/types/Data.type";
import useDateContext from "../../hooks/useDateContext";
import { SELECT_DATE_FOR } from "@/utils/constant.app";

interface TimePickerProps {
  time: ITime;
  setTime: (value: ITime) => void;
  type: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ time, setTime, type }) => {
  const {
    timeStart,
    timeDue,
    selectedDateStart,
    selectedDateDue,
    isCheckedDue,
    isCheckedStart,
    setSelectedDateDue,
    setSelectedDateStart,
  } = useDateContext();

  /************************* */
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const handleChangeTime = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    const value = e.target.value;

    if (!selectedDateStart.isSame(selectedDateDue) || !isCheckedDue || !isCheckedStart)
      return setTime({ ...time, [key]: value });

    if (type === SELECT_DATE_FOR.start_date) {
      let hour = timeStart.hour;
      let minute = timeStart.minute;
      let period = timeStart.period;

      if (key === "hour") {
        hour = value;
      } else if (key === "minute") {
        minute = value;
      } else if (key === "period") {
        period = value;
      }

      const startMinutes = parseInt(hour) * 60 + parseInt(minute) + (period === "PM" ? 12 * 60 : 0);
      const dueMinutes =
        parseInt(timeDue.hour) * 60 + parseInt(timeDue.minute) + (timeDue.period === "PM" ? 12 * 60 : 0);

      console.log({ hour, minute, period, startMinutes, dueMinutes, over: startMinutes > dueMinutes });
      if (startMinutes > dueMinutes) setSelectedDateDue(selectedDateDue.add(1, "day"));
    } else if (type === SELECT_DATE_FOR.due_date) {
      let hour = timeDue.hour;
      let minute = timeDue.minute;
      let period = timeDue.period;

      if (key === "hour") {
        hour = value;
      } else if (key === "minute") {
        minute = value;
      } else if (key === "period") {
        period = value;
      }

      const startMinutes =
        parseInt(timeStart.hour) * 60 + parseInt(timeStart.minute) + (timeStart.period === "PM" ? 12 * 60 : 0);
      const dueMinutes = parseInt(hour) * 60 + parseInt(minute) + (period === "PM" ? 12 * 60 : 0);

      if (startMinutes > dueMinutes) setSelectedDateStart(selectedDateDue.subtract(1, "day"));
    }

    setTime({ ...time, [key]: value });
  };

  return (
    <TimePickerContainer>
      <Select value={time.hour} onChange={(e) => handleChangeTime(e, "hour")}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </Select>
      <Separator>:</Separator>
      <Select value={time.minute} onChange={(e) => handleChangeTime(e, "minute")}>
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </Select>
      <Select value={time.period} onChange={(e) => handleChangeTime(e, "period")}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </Select>
    </TimePickerContainer>
  );
};

export default TimePicker;

const TimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff; /* Text color for dark mode */
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 8px;
  background-color: #333; /* Background color for dark mode */
  color: #fff; /* Text color for dark mode */
  border: 1px solid #555; /* Border color for dark mode */
  border-radius: 4px;
`;

const Separator = styled.span`
  margin: 0 8px;
  color: #fff; /* Text color for dark mode */
`;
