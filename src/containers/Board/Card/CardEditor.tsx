import React, { RefObject, forwardRef, useEffect, useState } from "react";
import { styled } from "styled-components";
import { IRect } from "@/types/Data.type";
import { initRect } from "@/utils/constant.app";
import { MenuEdit } from "../Edit/MenuItem";
import Editor from "../Edit/Editor";
import { useAppDispatch } from "@/store/hooks";
import { setRectCard } from "@/store/features/card/cardSlice";

interface MenuCardProps {
  refCard: RefObject<HTMLElement | null>;
  refMenu: RefObject<HTMLElement | null>;
}

interface IContainerProp {
  rect: IRect;
}

const CardEditor = forwardRef<HTMLDivElement, MenuCardProps>(({ refCard }, ref) => {
  const dispatch = useAppDispatch();
  const [rect, setRect] = useState<IRect>();

  const calculateDistance = () => {
    if (refCard?.current && ref) {
      const rectCard = refCard.current.getBoundingClientRect();
      const rectMenu = ref?.current?.getBoundingClientRect();

      const rectContainer = {
        ...initRect,
      };
      const viewHeight = window.innerHeight;
      const viewWidth = window.innerWidth;

      if (viewHeight < rectCard.top + rectMenu.height) {
        rectContainer.top = viewHeight - rectMenu.height;
      } else {
        rectContainer.top = rectCard.top;
      }
      if (viewWidth < rectCard.right + rectMenu.width) {
        rectContainer.left = rectCard.left - rectMenu.width - 15;
      } else {
        rectContainer.left = rectCard.right + 15;
      }
      dispatch(setRectCard(rectCard));
      setRect(rectContainer);
    }
  };
  useEffect(() => {
    calculateDistance();

    // Recalculate the distance when the window is resized
    const handleResize = () => {
      calculateDistance();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container ref={ref} className="container_menu-card" rect={rect || initRect}>
      {MenuEdit.map((item, index) => (
        <Editor key={index} {...item} />
      ))}
    </Container>
  );
});
export default CardEditor;

//------------------------------------------//

const Container = styled.div<IContainerProp>`
  position: fixed;
  top: ${(props) => props.rect.top}px;
  left: ${(props) => props.rect.left}px;
  z-index: 10000;
  transition: all 0.2s linear;
`;
