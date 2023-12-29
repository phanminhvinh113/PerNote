import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../store/store";
import { IListBoardSlice } from "../../../store/features/list/listSlice";
import { useNavigate } from "react-router-dom";
const Board = () => {
  const { list }: IListBoardSlice = useSelector((state: RootState) => state.listBoard);
 
  const navigate = useNavigate();

  const handleRedirect = (boardId: string) => {
    navigate(`dashboard/${boardId}`);
  };



  return (
    <BoardContainer>
      <h3>Your boards</h3>
      <BoardWrapper>
        {list &&
          list?.map((board) => (
            <BoardProvider key={board?.id} onClick={() => handleRedirect(board?.id)}>
              <span>{board?.title}</span>
            </BoardProvider>
          ))}
      </BoardWrapper>
    </BoardContainer>
  );
};

export default Board;
//
const BoardContainer = styled.div`
  margin: 500px 0;
`;

const BoardProvider = styled.div`
  cursor: pointer;
  margin: 0 10px;
  background-color: #44546f;
  border-radius: 3px;
  color: #fff;
  width: 150px;
  padding: 8px;
  height: 80px;
`;
const BoardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
