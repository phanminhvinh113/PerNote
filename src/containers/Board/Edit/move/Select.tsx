import { UniqueIdentifier } from "@dnd-kit/core";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IDestination } from "./Destination";
import { NAME_STORE_LOCAL } from "@/utils/constant.app";
import { getItemInLocalStorageSync } from "@/utils/helper";

export interface IOption {
  _id: string | number;
  title: string;
  [key: string]: unknown; // Allow additional properties of any type
}

interface SelectProps {
  label: string;
  property: string;
  getData: () => Promise<IOption[]>;
  setDestination: React.Dispatch<React.SetStateAction<IDestination>>;
  keyCurrent: UniqueIdentifier | undefined;
  defaultId: UniqueIdentifier | undefined;
}

const Select: React.FC<SelectProps> = ({ label, getData, property, setDestination, keyCurrent, defaultId }) => {
  const [options, setOptions] = useState<IOption[]>([]);

  const [selectedOption, setSelectedOption] = useState<UniqueIdentifier | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue === "" ? null : selectedValue);
    if (property === "boardId") {
      const columnsNew = getItemInLocalStorageSync(selectedValue + NAME_STORE_LOCAL.PREFIX_BOARD_COLUMNS);

      setDestination((prev) => ({
        ...prev,
        [property]: selectedValue,
        columnId: columnsNew && columnsNew[0] ? columnsNew[0]?._id : prev.columnId,
      }));
    } else {
      setDestination((prev) => ({ ...prev, [property]: selectedValue }));
    }
  };
  const handleSetData = useCallback(async () => {
    const data = await getData();

    const defaultOption = data.find((i) => i._id === defaultId);
    if (defaultOption) setSelectedOption(defaultOption?._id);

    setOptions(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  useEffect(() => {
    handleSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  if (!options || !options.length) return null;

  return (
    <Container>
      <Label>{label}</Label>
      <Dropdown darkMode={true} value={selectedOption || ""} onChange={handleSelectChange}>
        {options.map((option, index) => (
          <Option key={index} value={option?._id}>
            {keyCurrent === option?._id ? option?.title + "(current)" : option?.title}
          </Option>
        ))}
      </Dropdown>
    </Container>
  );
};

export default Select;
const Container = styled.div`
  flex: 1 1 100%;
  max-width: 100%;
  background-color: #a1bdd914;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  &:hover {
    background-color: #22272b;
  }
`;
const Label = styled.label`
  color: #9fadbc;
  display: block;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 0;
`;
const Dropdown = styled.select<{ darkMode: boolean }>`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: ${(props) => (props.darkMode ? "#444" : "#eee")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  cursor: pointer;
  border-radius: 8px;
  outline: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => (props.darkMode ? "#555" : "#ddd")};
  }
`;

const Option = styled.option``;
