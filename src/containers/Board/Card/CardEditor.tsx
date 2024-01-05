import React, { memo, useEffect, useState } from "react";
import { styled } from "styled-components";
import { IRect } from "@/types/Data.type";
import { initRect } from "@/utils/constant.app";
import { MenuEdit } from "../Edit/utils/MenuItem";
import Editor from "../Edit/Editor";
import { useAppDispatch } from "@/store/hooks";
import { setRectCard } from "@/store/features/card/cardSlice";

interface MenuCardProps {
  refCard: React.RefObject<HTMLDivElement | null>;
  refMenu: React.RefObject<HTMLDivElement>;
}

interface IContainerProp {
  rect: IRect;
}

// eslint-disable-next-line react-refresh/only-export-components
const CardEditor: React.FC<MenuCardProps> = ({ refCard, refMenu }) => {
  const dispatch = useAppDispatch();
  const [rect, setRect] = useState<IRect>(initRect);

  const calculateDistance = () => {
    if (refCard.current && refMenu.current) {
      const rectCard = refCard.current.getBoundingClientRect();
      const rectMenu = refMenu.current.getBoundingClientRect();

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
    <Container ref={refMenu} className="container_menu-card" rect={rect}>
      {MenuEdit.map((item, index) => (
        <Editor key={index} {...item} />
      ))}
    </Container>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CardEditor);

// eslint-disable-next-line react-refresh/only-export-components
const Container = styled.div<IContainerProp>`
  position: fixed;
  top: ${(props) => props.rect.top}px;
  left: ${(props) => props.rect.left}px;
  z-index: 10000;
  transition: all 0.2s linear;
`;
