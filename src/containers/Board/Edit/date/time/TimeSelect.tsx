import { FC, useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import TimePicker from "./TimePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs, { Dayjs } from "dayjs";
import { SELECT_DATE_FOR } from "@/utils/constant.app";
import useDateContext from "../../hooks/useDateContext";
import Menu from "@/components/UI/Menu";
import { ITime } from "@/types/Data.type";

interface TimeSelectProps {
  isChecked: boolean;
  selectedDate: Dayjs | null;
  type: string;
}

const TimeSelect: FC<TimeSelectProps> = ({ isChecked, type }) => {
  const { timeStart, timeDue, setTimeDue, setTimeStart } = useDateContext();

  const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
  const refAnchorEl = useRef<HTMLInputElement | null>(null);

  const onToggle = () => {
    if (isChecked) setIsOpenTimePicker((prev) => !prev);
  };

  const time = useMemo(() => {
    if (type === SELECT_DATE_FOR.start_date) return timeStart;
    if (type === SELECT_DATE_FOR.due_date) return timeDue;
    return {
      hour: dayjs().format("hh"),
      minute: dayjs().format("mm"),
      period: dayjs().format("A"),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeStart, timeDue]);

  const setTime = useCallback(
    (value: ITime) => {
      if (type === SELECT_DATE_FOR.start_date) {
        return setTimeStart(value);
      }

      if (type === SELECT_DATE_FOR.due_date) return setTimeDue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type]
  );

  const selectTime = isChecked && time ? `${time.hour}:${time.minute} ${time.period}` : "";

  return (
    <Container>
      <Input ref={refAnchorEl} type="text" value={selectTime} placeholder="HH:mm AM/PM" readOnly />
      <Button onClick={onToggle}>
        <AccessTimeIcon />
      </Button>

      {isOpenTimePicker && (
        <Menu anchorEl={refAnchorEl} onClose={onToggle} open={isOpenTimePicker} top={-50}>
          <TimePicker time={time} setTime={setTime} type={type} />
        </Menu>
      )}
    </Container>
  );
};

export default TimeSelect;

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 35px; /* Adjust the right position as needed */
  height: 100%; /* Make the button take the full height of the input */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const Input = styled.input`
  position: relative;
  background-color: #22272b;
  box-shadow: inset 0 0 0 2px #85b8ff;
  width: calc(100% - 32px); /* Adjust the width considering the button width and margin */
  margin: 0;
  padding: 6px;
  outline: none;
  border: none;
  box-sizing: border-box;
  color: #b6c2cf;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-display: swap;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  border-radius: 3px;
`;
