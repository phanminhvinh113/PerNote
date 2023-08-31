import { forwardRef, useContext, useEffect, useState } from "react";
import { Task, Type } from "../types/Column";
import { useSortable } from "@dnd-kit/sortable";
import { DragContext, typeContext } from "../context/DragContext";
// import { CSS } from "@dnd-kit/utilities";
//
interface ICardProps {
  card: Task;
}
//
const Card = forwardRef<HTMLDivElement, ICardProps>(({ card }, ref) => {
  //
  const [isNewCard, setIsNewCard] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { setTasks } = useContext<typeContext>(DragContext);

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
    setIsNewCard(false);
  };
  useEffect(() => {
    if (isNewCard) {
      setIsEditMode(true);
    }
  }, [isNewCard]);
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
        ref={ref}
        data-text="Typing Task..."
        className={isDragging ? "invisible" : inputStyle}
        contentEditable={isEditMode || !card?.content}
        dangerouslySetInnerHTML={{ __html: card.content }}
        onBlur={(e) => {
          updateCard(card.id, e.currentTarget.innerText);
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
    </div>
  );

  function updateCard(cardId: number | string, value: string) {
    if (!cardId || !value) {
      return toggleEditMode();
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === cardId ? { ...task, content: value.trim() } : task
      )
    );
    toggleEditMode();
  }
});
//
const styledCardContainerDragging =
  "opacity-30 cursor-pointer p-[18px] items-center flex text-left rounded-xl border-[1px] border-slate-400  cursor-grab relative";
const styledCardContainer =
  " bg-gray-800 p-[18px] items-center flex text-left rounded-xl cursor-grab relative";
const inputStyle =
  "w-full break-words whitespace-pre-wrap border-none rounded bg-transparent text-white focus:outline-none ";

//
export default Card;
