import {
  useState,
  useContext,
  forwardRef,
  useMemo,
  HTMLAttributes,
  useRef,
  useEffect,
  memo,
} from "react";
import { Column, Task, Type } from "../types/Column";
import Card from "./Card";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "../assets/Icons/TrashICon";
import { DragContext, typeContext } from "../context/DragContext";
import "../style/DragList.css";
import PlusIcon from "../assets/Icons/PlusICon";

//-----------------------------------------------------------------------------//

interface IColumnProps extends HTMLAttributes<HTMLDivElement> {
  column: Column;
  taskList: Task[];
}

//-----------------------------------------------------------------------//

const DragList = forwardRef<HTMLInputElement, IColumnProps>((props, ref) => {
  //
  const { column, taskList } = props;
  //
  const taskIds = useMemo(() => {
    return taskList.map((task) => task.id);
  }, [taskList]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const containerListCardRef = useRef<HTMLDivElement>(null);
  const cardInputRef = useRef<HTMLDivElement>(null);
  //
  const { setColumns, columns, setTasks, tasks } =
    useContext<typeContext>(DragContext);

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
    disabled: isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  //
  useEffect(() => {
    console.log(taskList);
    console.log(cardInputRef.current);
    cardInputRef.current?.focus();
  }, [tasks]);
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
      <div className={headerStyle} {...attributes} {...listeners}>
        <div className={titleStyle} onDoubleClick={onDoubleClick}>
          {isEditMode || !column?.title ? (
            <input
              ref={ref}
              value={column.title}
              placeholder="Typing Title Here...!"
              className={inputStyle}
              onBlur={() => {
                setIsEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setIsEditMode(false);
                }
              }}
              onChange={(e) => updateTitleColumn(e.target.value)}
            />
          ) : (
            column?.title
          )}
        </div>
        <button className={buttonStyle} onClick={deleteColumn}>
          <TrashIcon />
        </button>
      </div>

      <div ref={containerListCardRef} className={sortTableListStyle}>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {taskList?.map((task) => (
            <Card ref={cardInputRef} card={task} key={task.id} />
          ))}
        </SortableContext>
      </div>
      {/* Button Add New Card*/}
      <button
        className={buttonAddCardStyle}
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );

  function createTask(columnId: number | string) {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: tasks.length + 1, columnId, content: "" },
    ]);
  }
  //
  function onDoubleClick() {
    setIsEditMode(true);
  }
  //
  function updateTitleColumn(value: string) {
    if (!column?.id) return;
    // Add Column Into List//
    setColumns(
      columns.map((col) =>
        col.id !== column.id ? col : { ...col, title: value }
      )
    );
  }
  //
  function deleteColumn() {
    //
    const confirm = window.confirm("Do you want to delete!");

    if (!confirm || !column?.id) return;
    // Delete Column Via Column Id
    setColumns(columns.filter((prev) => prev.id !== column.id));
  }
});
// STYLE
const containerStyle =
  "bg-columnBackgroundColor pb-1 pt-2 border-2 p-b-20 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col px-[8px]";
//
const headerStyle =
  "mx-auto p-2 w-full flex items-center justify-between mb-[5px]";
//
const titleStyle = "w-[80%] break-words min-h-[30px] ";
//
const draggingContainerStyle =
  " bg-columnBackgroundColor opacity-40 border-2 border-white-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col";
//
const sortTableListStyle =
  "flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-scroll";
//
const buttonStyle =
  "stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2";
//
const buttonAddCardStyle =
  "flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-2 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black";
//
const inputStyle =
  "focus:outline-none focus-visible-bb focus:ring-0 w-[100%] p-[8px] rounded-lg  bg-transparent ";
//
// eslint-disable-next-line react-refresh/only-export-components
export default memo(DragList);
