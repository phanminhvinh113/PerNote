import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Actions } from "./Actions";
import ActionItem from "./ActionItem";
interface BoardActionsProps {
  onClose: () => void;
}

const BoardAction: React.FC<BoardActionsProps> = ({ onClose }) => {
  return (
    <Container className="board_action">
      <Header>
        <span>List Actions</span>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </Header>
      <Body>
        {Actions.map((action, index) => (
          <ActionItem key={index} action={action} />
        ))}
      </Body>
    </Container>
  );
};

export default BoardAction;

const Container = styled.div`
  background-color: #282e33;
  border-radius: 8px;
  box-shadow: 0px 0px 14px 8px #3b3f4747;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 285px;
`;
const Header = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 32px 1fr 42px;
  padding: 8px;
  position: relative;
  text-align: center;
  span {
    box-sizing: border-box;
    color: #9fadbc;
    display: block;
    font-size: 0.95em;
    font-weight: 600;
    grid-column: 1 / span 3;
    grid-row: 1;
    height: 40px;
    letter-spacing: -0.003em;
    line-height: 16px;
    line-height: 40px;
    margin: 0;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
  }
`;
const Button = styled.button`
  border-radius: 10px;
  color: #b6c2cf;
  grid-column: 3;
  grid-row: 1;
  z-index: 2;
  padding: 6px;

  &:hover {
    background-color: #a6c5e229;
    color: #9fadbc;
    text-decoration: none;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 10px 0;
`;
