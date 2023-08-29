import { FunctionComponent, useState } from "react";
import { Task, Type } from "../types/Column";
import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
//
interface ICardProps {
  card: Task;
}
//
const Card: FunctionComponent<ICardProps> = ({ card }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: Type.CARD,
      dataDrag: card,
    },
  });

  const transformCustom = transform
    ? `translate3d(${transform?.x}px , ${transform?.y}px ,0)  scaleX(1) scaleY(1)`
    : undefined;

  const style = {
    transform: transformCustom,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        !isDragging ? styledCardContainer : styledCardContainerDragging
      }
      {...attributes}
      {...listeners}
    >
      <div className={isDragging ? "invisible" : undefined}>{card.content}</div>
    </div>
  );
};
//
const styledCardContainerDragging =
  "opacity-30 cursor-pointer p-[18px] items-center flex text-left rounded-xl border-[1px] border-slate-400  cursor-grab relative";
const styledCardContainer =
  " bg-gray-800 p-[18px] items-center flex text-left rounded-xl cursor-grab relative";
export default Card;
