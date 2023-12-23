import { FC } from "react";
import styled from "styled-components";
import { TAction } from "./Actions";

interface ActionItemProps {
  action: TAction;
}

const ActionItem: FC<ActionItemProps> = ({ action }) => {
  return (
    <Item onClick={action?.method}>
      {action?.title} {action?.icon}
    </Item>
  );
};

export default ActionItem;

const Item = styled.div`
  display: flex;
  align-content: center;
  color: #b6c2cf;
  cursor: pointer;
  display: block;
  font-weight: 400;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  width: 100%;
  font-size: 14px;
  &:hover {
    background-color: #a6c5e229;
  }
`;
