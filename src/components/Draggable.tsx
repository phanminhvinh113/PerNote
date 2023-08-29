import { FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import "../style/Item.css";
//
interface typeItem {
  text: string;
  imageUrl?: string;
  id?: number | string;
}
interface IDraggable {
  item?: typeItem;
  id: number | string;
  children?: ReactNode;
  className?: string;
}

const Draggable: FC<IDraggable> = ({ id, children, className }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, scaleX(1),scaleY(1))`,
      }
    : undefined;
  return (
    <div
      className={className}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
