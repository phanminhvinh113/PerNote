import { setIsDisableDragColumn } from "@/store/features/column/columnSlice";
import { useAppDispatch } from "@/store/hooks";
import { IRect } from "@/types/Data.type";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  open: boolean;
  anchorEl: HTMLElement | null;
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
    if (anchorEl) {
      return anchorEl.getBoundingClientRect() as IRect;
    }
  }, [anchorEl]);

  const [viewLeft, setViewLeft] = useState<number>(rect?.left ? rect.left : 0);

  const handleClickOutside = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      onClose();
      dispatch(setIsDisableDragColumn(false));
    }
  };

  const calculateDistance = useCallback(() => {
    if (componentRef.current) {
      const rectComponent = componentRef.current.getBoundingClientRect() as IRect;
      if (rectComponent.right > window.innerWidth - 10) {
        setViewLeft(window.innerWidth - rectComponent.width - 10);
      } else {
        setViewLeft(left - right + (rect?.left || 0));
      }
    }
  }, [left, right, rect, componentRef]);

  useEffect(() => {
    let timeoutId: number | undefined;

    calculateDistance();

    // Recalculate the distance when the window is resized

    const handleResize = () => {
      // Clear the previous timeout to prevent the calculation from happening
      // if the user is still resizing the window
      clearTimeout(timeoutId);
      // Set a new timeout to delay the calculation
      timeoutId = setTimeout(() => {
        calculateDistance();
      }, 400); // Adjust the delay time (in milliseconds) as needed
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Attach event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (!open || !anchorEl) return null;
  //

  return (
    <Container>
      <Wrapper $left={viewLeft} $top={rect ? rect.top + top : top} ref={componentRef}>
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
  z-index: 1000;
  cursor: default;
`;
const Wrapper = styled.div<IPropsStyleContainer>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  transition: all 0.2s linear;
`;
