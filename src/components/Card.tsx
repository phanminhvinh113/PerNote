import { FC, memo, useContext, useEffect, useRef, useState } from "react";
import { Task, Type } from "../types/Column";
import { useSortable } from "@dnd-kit/sortable";
import { DragContext, typeContext } from "../context/DragContext";
import PencilIcon from "../assets/Icons/PencilIcon";

//
interface ICardProps {
  card: Task;
}

// eslint-disable-next-line react-refresh/only-export-components
const Card: FC<ICardProps> = ({ card }) => {
  //

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { updateCard } = useContext<typeContext>(DragContext);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  //
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
    disabled: isEditMode,
  });

  const transformCustom = transform
    ? `translate3d(${transform?.x}px , ${transform?.y}px ,0)  scaleX(1) scaleY(1)`
    : undefined;

  const style = {
    transform: transformCustom,
    transition,
  };
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    if (!isEditMode) focus();
  };
  useEffect(() => {
    if (isEditMode || !card?.content) {
      contentEditableRef?.current?.focus();
    }
  }, [isEditMode, card]);
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
      <div
        ref={contentEditableRef}
        data-text="Typing Task..."
        className={isDragging ? "invisible" : inputStyle}
        contentEditable={isEditMode || !card?.content}
        dangerouslySetInnerHTML={{ __html: card.content }}
        onBlur={(e) => {
          updateCard(card.id, e.currentTarget.innerText);
          setIsEditMode(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            updateCard(card.id, e.currentTarget.innerText);
          }
        }}
        onDoubleClick={(e) => {
          e.currentTarget.innerText = card.content;
          setIsEditMode(true);
        }}
      />
      {!isEditMode && (
        <button
          className={isDragging ? "invisible" : buttonStyle}
          onClick={toggleEditMode}
        >
          <PencilIcon />
        </button>
      )}
    </div>
  );
};
//
const styledCardContainerDragging =
  "opacity-30 cursor-pointer p-[18px] items-center flex text-left rounded-xl border-[1px] border-slate-400  cursor-grab relative";
const styledCardContainer =
  " bg-gray-800 p-[18px] items-center flex text-left rounded-xl cursor-grab relative";
const inputStyle =
  "w-full break-words whitespace-pre-wrap border-none rounded bg-transparent text-white cursor-text focus:outline-none ";
const buttonStyle = "stroke-gray-500 hover:stroke-white  rounded px-1 py-2";
//
// eslint-disable-next-line react-refresh/only-export-components
export default memo(Card);
