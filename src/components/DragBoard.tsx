import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { Column, Task, Type } from "../types/Column";
import DragList from "./DragList";
import Button from "./Button";
import Card from "./Card";
import { typeContext, DragContext } from "../context/DragContext";
//
interface IDragBoardProps {}

//Styled Component
const containerStyle =
  "m-auto flex min-h-screen w-full overflow-x-scroll overflow-y-hidden px-[40px]";

const DragBoard: FC<IDragBoardProps> = () => {
  const { setColumns, columns, setTasks, tasks } =
    useContext<typeContext>(DragContext);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  //Ref For Scroll Horizontal Column
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref for Input Title Column
  const inputRef = useRef<HTMLInputElement>(null);
  //
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  // Scrolling To Left End Document When Add New Column Into List
  useEffect(() => {
    if (inputRef.current && !inputRef.current?.value) {
      scrollToRightEnd();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [columns.length]);
  //
  return (
    <div ref={containerRef} className={containerStyle}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <DragList ref={inputRef} key={column.id} column={column} />
              ))}
            </SortableContext>
          </div>
          <Button handleCreateNew={createNewColumn}>Add Column</Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && <DragList column={activeColumn} />}
            {activeTask && <Card card={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function scrollToRightEnd() {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }
  //
  function createNewColumn() {
    const columnToAdd: Column = {
      id: Type.COLUMN + `${columns.length + 1}`,
      title: "",
    };
    setColumns([...columns, columnToAdd]);
  }
  //
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === Type.COLUMN) {
      setActiveColumn(event.active.data.current?.dataDrag);
      return;
    }

    if (event.active.data.current?.type === Type.CARD) {
      setActiveTask(event.active.data.current?.dataDrag);
      return;
    }
  }
  //
  function onDragEnd(event: DragEndEvent) {
    //
    setActiveColumn(null);
    setActiveTask(null);
    //
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === Type.COLUMN;

    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  //
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === Type.CARD;
    const isOverATask = over.data.current?.type === Type.CARD;

    if (!isActiveATask) return;

    //Im dropping a Task over another Task or Dropping difference COLUMN
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        // CHECK IF DRAG DIFFERENCE COLUMN
        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          //
          return arrayMove(
            tasks,
            activeIndex,
            activeIndex < overIndex ? overIndex - 1 : overIndex
          );
        }
        // IF NOT
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
    //
    const isOverAColumn = over.data.current?.type === Type.COLUMN;
    //Im dropping a Task over a Column If Column Empty
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      setTasks((tasks) => {
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};

export default DragBoard;
