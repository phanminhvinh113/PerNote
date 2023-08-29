import { FC, useMemo, useState } from "react";
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
import ColumnContainer from "./DragList";
import Button from "./Button";
import Card from "./Card";
//
interface IDragBoardProps {}
//
// interface IState {
//   columns: Column[];
//   tasks: Task[];
//   activeColumn: Column | null;
//   activeTask: Task | null;
// }
//
const defaultCols: Column[] = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
  // Add more items as needed
];
const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "todo",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "doing",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "doing",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "done",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "done",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "done",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "todo",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "todo",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "todo",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "todo",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "doing",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "doing",
    content: "Design and implement responsive UI",
  },
];
//Styled Component
const containerStyle =
  "m-auto flex min-h-screen w-full overflow-x-auto overflow-y-auto px-[40px]";

const containerColumnStyle =
  "m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]";

//
const DragBoard: FC<IDragBoardProps> = () => {
  //Initial State
  // const [state, setState] = useState<IState>({
  //   columns: defaultCols,
  //   tasks: defaultTasks,
  //   activeColumn: null,
  //   activeTask: null,
  // });
  //
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  //
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  //
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  return (
    <div className={containerStyle}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={containerColumnStyle}>
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((column) => (
                  <ColumnContainer
                    key={column.id}
                    column={column}
                    tasks={tasks.filter((item) => item.columnId === column.id)}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          <Button handleCreateNew={createNewColumn}>Add Column</Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && <Card card={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
  //
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Title ${columns.length + 1}`,
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
    const isActiveCard = active.data.current?.type === Type.CARD;

    if (!isActiveAColumn || !isActiveCard) return;

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
function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}
//

export default DragBoard;
