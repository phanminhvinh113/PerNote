import { FunctionComponent, useMemo } from "react";
import { Column, Task, Type } from "../types/Column";
import Card from "./Card";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface IColumnProps {
  column: Column;
  tasks: Task[] | [];
}
const containerStyle =
  "bg-columnBackgroundColor pb-6 pt-2 border-2 p-b-20 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col px-[8px]";
//
const draggingContainerStyle =
  " bg-columnBackgroundColor opacity-40 border-2 border-white-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col";
//s
const DragList: FunctionComponent<IColumnProps> = ({ column, tasks }) => {
  //
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  //
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: Type.COLUMN,
      dataDrag: column,
    },
  });
  //
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  //
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={draggingContainerStyle}
      ></div>
    );
  }
  //
  return (
    <div className={containerStyle} ref={setNodeRef} style={style}>
      <div className="mx-auto p-4 w-full" {...attributes} {...listeners}>
        {column?.title}
      </div>
      <div className="flex flex-grow flex-col gap-4  overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks?.map((task) => (
            <Card card={task} key={task.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default DragList;
