import Banner from "@/containers/Home/Banner/Banner";
import Board from "@/containers/Home/Board/Board";
import styled from "styled-components";

const HomePage = () => {
  return (
    <Container>
      <Banner />
      <Board />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  height: 100%;
`;
