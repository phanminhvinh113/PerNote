import styled from "styled-components";
import { FC, ReactNode, useState } from "react";
import { Backdrop } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "react-router-dom";
import { UniqueIdentifier } from "@dnd-kit/core";
import useBoardContext from "@/hooks/useBoardContext";

interface MenuChildProp {
  title: string;
  icon: ReactNode;
  component?: ReactNode;
  method?: (boardId: string | undefined, columnId: UniqueIdentifier, cardId: UniqueIdentifier) => void;
}

const Editor: FC<MenuChildProp> = ({ title, icon, component, method }) => {
  const { boardId } = useParams();
  const card = useAppSelector((state) => state.card.card_select);
  const { setListColumn } = useBoardContext();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  const toggleEditor = () => {
    setIsOpenEdit((prev) => !prev);
  };
  const handleOnClick = async () => {
    if (!method) return;
    const result = await method(boardId, card.columnId, card._id);
    

    if (!Array.isArray(result)) return;
    setListColumn(result);
  };

  const handleToggleOpenEditor = () => {
    toggleEditor();
  };

  return (
    <Container onClick={handleOnClick}>
      <EditorItem onClick={handleToggleOpenEditor}>
        <div>{title}</div>
        <div>{icon}</div>
      </EditorItem>
      {component && <Backdrop open={isOpenEdit} onClick={handleToggleOpenEditor} sx={{ zIndex: 1000 }}></Backdrop>}
      {isOpenEdit && component}
    </Container>
  );
};
export default Editor;
const Container = styled.div``;
const EditorItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-radius: 6px;
  padding: 8px;
  background-color: #2c333a;
  color: #b6c2cf;
  font-weight: 500;
  transition: transform 0.2s linear;
  &:hover {
    background-color: #454f59;
    transform: translateX(10px);
  }
  position: relative;
  font-size: 0.8em;
`;
