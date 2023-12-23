import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id } from "@/types/Data.type";

interface ISortTableItem {
  id: Id;
  children: React.ReactNode;
  className?: string;
  type: string;
  dataDrag: object;
}
//
const SortableItem: FC<ISortTableItem> = ({ id, children, className, type, dataDrag }) => {
  //
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: {
      type,
      dataDrag,
    },
  });
  const transformAnimation = CSS.Transform.toString(transform);
  const style = {
    transform: transformAnimation,
    transition,
  };

  return (
    <div className={className} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
