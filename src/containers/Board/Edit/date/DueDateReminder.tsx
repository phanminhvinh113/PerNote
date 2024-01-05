import React, { useState } from "react";
import styled from "styled-components";

interface DueDateReminderProps {
  darkMode?: boolean;
}

const ReminderOptions = [
  { label: "None", value: null },
  { label: "At Due Time", value: 0 },
  { label: "5 Minutes Before", value: 5 },
  { label: "10 Minutes Before", value: 10 },
  { label: "30 Minutes Before", value: 30 },
  { label: "1 Hour Before", value: 60 },
  { label: "2 Hour  Before", value: 120 },
  { label: "1 Day Before", value: 1440 },
  { label: "2 Day Before", value: 2880 },
];

const DueDateReminder: React.FC<DueDateReminderProps> = ({ darkMode = true }) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const handleOptionSelect = (value: number) => {
    setSelectedOption(value);
  };

  return (
    <Container darkMode={darkMode}>
      <Title darkMode={darkMode}>Reminder</Title>
      <Dropdown
        darkMode={darkMode}
        value={selectedOption || "None"}
        onChange={(e) => handleOptionSelect(Number(e.target.value))}
      >
        {ReminderOptions.map((option) => (
          <option key={option.label} value={option.value || "none"}>
            {option.label}
          </option>
        ))}
      </Dropdown>
    </Container>
  );
};

const Container = styled.div<{ darkMode: boolean }>`
  background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3<{ darkMode: boolean }>`
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  margin-bottom: 12px;
`;

const Dropdown = styled.select<{ darkMode: boolean }>`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: ${(props) => (props.darkMode ? "#444" : "#eee")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.darkMode ? "#555" : "#ddd")};
  }
`;

export default DueDateReminder;
