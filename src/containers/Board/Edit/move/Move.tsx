import { FC } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Destination from "./Destination";

interface MoveProps {}

const Move: FC<MoveProps> = () => {
  return (
    <Container>
      <Wrapper>
        <Header title="Move" />
        <Header title="Suggest" position="left" fontTitle={0.7} />
        <SuggestButton>
          Task <ArrowCircleRightIcon />
        </SuggestButton>
        <Header title="Select destination" position="left" fontTitle={0.7} />
        <Destination />
      </Wrapper>
    </Container>
  );
};

export default Move;

const Container = styled.div`
  background: #282e33;
  border-radius: 8px;
  box-shadow: 0px 0px 0px 1px #39424a, 0px 8px 12px #0304045c, 0px 0px 1px 1px #03040480;
  width: 304px;
`;
const Wrapper = styled.div`
  overflow: overlay;
`;
const SuggestButton = styled.div`
  background-color: #a1bdd914;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  color: #dcdfe4;
  cursor: pointer;
  display: block;
  font-weight: 600;
  height: 32px;
  margin-top: 8px;
  max-width: 280px;
  overflow: hidden;
  padding: 6px 12px;
  text-decoration: none;
  text-overflow: ellipsis;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  margin: 0 auto;
`;
