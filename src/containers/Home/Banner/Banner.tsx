import { FC } from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

import { toggleHiddenBanner } from "@/store/features/app/appSlice";

interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  //   const [isHidden, setIsHidden] = useState(false);
  const { isHiddenBanner } = useAppSelector((state) => state.app);
  const dispatch = useDispatch();

  const handlerOnclick = () => {
    dispatch(toggleHiddenBanner());
  };

  return (
    <Container $hidden={isHiddenBanner}>
      <Button $hidden={isHiddenBanner} onClick={handlerOnclick}>
        {isHiddenBanner ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
      </Button>
    </Container>
  );
};

export default Banner;

const Container = styled.div<{ $hidden: boolean }>`
  position: relative;
  height: 100%;
  width: ${(props) => (props.$hidden ? "20px" : "240px")};
  transform: translateX(${(props) => (props.$hidden ? "-100%" : 0)});
  background-color: #ccc;
  transition: all 0.35s linear;
`;

const Button = styled.button<{ $hidden: boolean }>`
  cursor: pointer;
  position: absolute;
  right: ${(props) => (props.$hidden ? "-20px" : "10px")};
`;
