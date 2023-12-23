import { ICard, IColumn, Type } from "@/types/Data.type";
import { DragOverlay, DropAnimation, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { FC, Fragment } from "react";
import { createPortal } from "react-dom";
import Column from "./Column/Column";
import Card from "./Card/Card";

interface OverLayProps {
  activeDragType: Type | null;
  activeData: ICard | IColumn | null;
}

const OverLay: FC<OverLayProps> = ({ activeDragType, activeData }: OverLayProps) => {
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.25",
          transform: "all linear 0.5s",
        },
      },
    }),
  };
  return (
    <Fragment>
      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
          {activeDragType === Type.COLUMN && activeData?._id && <Column column={activeData as IColumn} />}
          {activeDragType === Type.CARD && activeData?._id && <Card card={activeData as ICard} />}
        </DragOverlay>,
        document.body
      )}
    </Fragment>
  );
};

export default OverLay;
