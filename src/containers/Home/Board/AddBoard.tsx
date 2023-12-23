import styled from "styled-components";
import CloseIcon from "../../../assets/Icons/Close";
import ImgSkeleton from "../../../assets/Icons/board-skeleton.svg";
import BackIcon from "../../../assets/Icons/BackIcon";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTitleBoard } from "../../../store/features/list/listSlice";

const AddBoard = () => {
  const dispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState<string>("");
  const refInput = useRef<HTMLInputElement | null>(null);

  const handleChangeInput = (value: string) => {
    setInputTitle(value);
  };

  const handleCreateBoard = () => {
    dispatch(
      addNewTitleBoard({
        titleBoard: inputTitle,
      })
    );
    setInputTitle("");
    refInput.current?.focus();
  };

  return (
    <Container>
      <Header>
        <h2 className="title">Create Board</h2>
        <Button grid_col={3}>
          <BackIcon />
        </Button>
        <Button grid_col={1}>
          <CloseIcon />
        </Button>
      </Header>
      <BodyProvider>
        <SkeletonBoard>
          <BackGroundSkeleton>
            <img src={ImgSkeleton} />
          </BackGroundSkeleton>
        </SkeletonBoard>
        <BoardTitle>
          <div className="title_board">
            Board title
            <span className="required_icon">*</span>
          </div>
          <TyingTitle
            type="text"
            ref={refInput}
            value={inputTitle}
            $border={!inputTitle.trim() ? "#ef5c48" : "#eee"}
            onChange={(e) => handleChangeInput(e.currentTarget.value)}
          />
        </BoardTitle>
        {!inputTitle.trim() && <ErrorInput>Title Required</ErrorInput>}
        <ButtonAdd onClick={handleCreateBoard} $cursor={!inputTitle.trim() ? "not-allowed" : "pointer"}>
          Create
        </ButtonAdd>
      </BodyProvider>
    </Container>
  );
};

export default AddBoard;
//
const Container = styled.section`
  width: 304px;
  will-change: top, left;
  top: 52px;
  left: 357px;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  background-color: #282e33;
  border-radius: 8px;
  box-shadow: 0px 8px 12px #091e4226;
  box-sizing: border-box;
  outline: 0;
  overflow: hidden;
`;
const Header = styled.header`
  padding: 4px 8px;
  position: relative;
  text-align: center;
  display: grid;
  align-items: center;
  grid-template-columns: 32px 1fr 32px;

  .title {
    color: #44546f;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.003em;
    line-height: 40px;
    display: block;
    position: relative;
    height: 40px;
    margin: 0;
    overflow: hidden;
    padding: 0 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
    grid-column: 1 / span 3;
    grid-row: 1;
  }
`;
const BodyProvider = styled.div`
  max-height: 503px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;
`;

const SkeletonBoard = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
`;

const BackGroundSkeleton = styled.div`
  width: 200px;
  height: 120px;
  background: none;
  background-position: center center;
  background-size: cover;
  border-radius: 3px;
  box-shadow: 0px 1px 1px #091e4240;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border: 0;
    user-select: none;
  }
`;

const Button = styled.button<{ grid_col: number }>`
  grid-column: ${(props) => props.grid_col};
  grid-row: 1;
  color: #9ba6b9;
  border-radius: 8px;
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const BoardTitle = styled.div`
  color: #eee;
  .required_icon {
    color: #e34935;
    margin-left: 4px;
  }
`;
const TyingTitle = styled.input<{ $border: string }>`
  margin-top: 4px;
  box-shadow: inset 0 0 0 2px #e34935;
  outline: none;

  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  border-radius: 3px;
  padding: 8px 12px;
  box-shadow: inset 0 0 0 2px #091e4224;
  background-color: #22272b;
  width: 100%;
  margin-bottom: 0;
  border: ${(props) => props.$border};
  &:hover {
    background-color: #282e33;
    box-shadow: inset 0 0 0 2px #a6c5e229;
  }
  &:focus {
    background-color: #282e33;
    box-shadow: inset 0 0 0 2px #a6c5e229;
  }
`;
const ButtonAdd = styled.button<{ $cursor: string }>`
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: ${(props) => props.$cursor};
  padding: 6px 12px;
  text-decoration: none;
  white-space: normal;
  background-color: #a1bdd914;
  box-shadow: none;
  border: none;
  color: #b6c2cf;
  font-weight: 500;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  &:hover {
    opacity: 0.8;
  }
`;
const ErrorInput = styled.div`
  color: #fff;
`;
