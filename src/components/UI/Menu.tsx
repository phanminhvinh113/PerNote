import React, { useRef, useMemo, Fragment, RefObject } from "react";
import useClickOutside from "@/hooks/useClickOutSide";
import useResize from "@/hooks/useResize";
import { setIsDisableDragColumn } from "@/store/features/column/columnSlice";
import { useAppDispatch } from "@/store/hooks";
import { IRect } from "@/types/Data.type";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  open: boolean;
  anchorEl: RefObject<HTMLElement> | null;
  onClose: () => void;
  left?: number;
  right?: number;
  top?: number;
}
interface IPropsStyleContainer {
  $left: number;
  $top: number;
}
const Menu: React.FC<Props> = ({ children, open, anchorEl, onClose, left = 0, right = 0, top = 0 }) => {
  const dispatch = useAppDispatch();
  const componentRef = useRef<HTMLDivElement | null>(null);

  const rect = useMemo(() => {
    if (anchorEl?.current) return anchorEl.current.getBoundingClientRect() as IRect;
  }, [anchorEl]);

  const handleClickOutSide = () => {
    onClose();
    dispatch(setIsDisableDragColumn(false));
  };

  const [viewLeft, viewHeight] = useResize({
    componentRef,
    left,
    rect,
    right,
    top,
    delay: 400,
  });

  useClickOutside({
    dependencies: [],
    handler: handleClickOutSide,
    refs: [componentRef],
    condition: [open],
  });

  if (!open || !anchorEl) return <Fragment></Fragment>;

  return (
    <Container>
      <Wrapper $left={viewLeft} $top={viewHeight} ref={componentRef}>
        {children}
      </Wrapper>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  cursor: default;
`;
const Wrapper = styled.div<IPropsStyleContainer>`
  position: fixed;
  top: ${(props) => (props.$top < 0 ? "auto" : `${props.$top}px`)};
  bottom: ${(props) => (props.$top < 0 ? `${-props.$top}px` : "auto")};
  left: ${(props) => (props.$left < 0 ? "auto" : `${props.$left}px`)};
  right: ${(props) => (props.$left < 0 ? `${-props.$left}px` : "auto")};
  transition: top 0.2s linear, left 0.2s linear, right 0.2s linear, bottom 0.2s linear;
`;
