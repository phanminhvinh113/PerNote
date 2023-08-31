import { FC, useMemo, useRef, useState } from "react";
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
import { DragContext } from "../context/DragContext";

//
interface IDragBoardProps {}
//
//
//
const defaultCols: Column[] = [
  { id: "Column1", title: "Todo" },
  { id: "Column2", title: "Doing" },
  { id: "Column3", title: "Done" },
  // Add more items as needed
];
const defaultTasks: Task[] = [
  {
    id: 1,
    columnId: "Column1",
    content: "List admin APIs for dashboard",
  },
  {
    id: 2,
    columnId: "Column1",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: 3,
    columnId: "Column2",
    content: "Conduct security testing",
  },
  {
    id: 4,
    columnId: "Column2",
    content: "Analyze competitors",
  },
  {
    id: 5,
    columnId: "Column3",
    content: "Create UI kit documentation",
  },
  {
    id: 6,
    columnId: "Column3",
    content: "Dev meeting",
  },
  {
    id: 7,
    columnId: "Column3",
    content: "Deliver dashboard prototype",
  },
  {
    id: 8,
    columnId: "Column1",
    content: "Optimize application performance",
  },
  {
    id: 9,
    columnId: "Column1",
    content: "Implement data validation",
  },
  {
    id: 10,
    columnId: "Column1",
    content: "Design database schema",
  },
  {
    id: 11,
    columnId: "Column1",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: 12,
    columnId: "Column2",
    content: "Implement error logging and monitoring",
  },
  {
    id: 13,
    columnId: "Column2",
    content: "Design and implement responsive UI",
  },
];
//Styled Component
const containerStyle =
  "m-auto flex min-h-screen w-full overflow-x-scroll overflow-y-hidden px-[40px]";

//

const DragBoard: FC<IDragBoardProps> = () => {
  //
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  //
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  //
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  //
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const initialValueContext = {
    tasks,
    setTasks,
    columns,
    setColumns,
    isEditMode,
    setIsEditMode,
  };

  return (
    <DragContext.Provider value={initialValueContext}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div ref={containerRef} className={containerStyle}>
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((column) => (
                  <DragList
                    ref={inputRef}
                    key={column.id}
                    column={column}
                    taskList={tasks.filter(
                      (item) => item.columnId === column.id
                    )}
                  />
                ))}
              </SortableContext>
            </div>
            <Button handleCreateNew={createNewColumn}>Add Column</Button>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <DragList
                  column={activeColumn}
                  taskList={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && <Card card={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
    </DragContext.Provider>
  );
  //

  //
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
    scrollToRightEnd();
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
