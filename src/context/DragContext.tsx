/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Column, Task } from "../types/Column";
import DragBoard from "../components/DragBoard";
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
//
export type typeContext = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
  updateTitleColumn: (columnId: number | string, value: string) => void;
  deleteColumn: (columnId: string | number) => void;
  updateCard: (cardId: number | string, value: string) => void;
  deleteCard: (cardId: number | string) => void;
};
export const DragContext = createContext<typeContext>({
  tasks: [],
  setTasks: () => {},
  columns: [],
  setColumns: () => {},
  updateTitleColumn: (cardId, value) => {
    console.log(cardId, value);
  },
  deleteColumn(columnId) {
    console.log(columnId);
  },
  updateCard(cardId, value) {
    console.log(cardId, value);
  },
  deleteCard(cardId) {
    console.log(cardId);
  },
});
//
interface DragContextProps {}

const DragContextContainer: FunctionComponent<DragContextProps> = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  //
  const initialValueContext: typeContext = {
    tasks,
    setTasks,
    columns,
    setColumns,
    updateTitleColumn,
    deleteColumn,
    updateCard,
    deleteCard,
  };
  //
  // Method For Column
  function updateTitleColumn(columnId: number | string, value: string) {
    if (!columnId) return;
    // Add Column Into List
    setColumns((preColumn) =>
      preColumn.map((col) =>
        col.id !== columnId ? col : { ...col, title: value }
      )
    );
  }
  //
  function deleteColumn(columnId: string | number) {
    //
    const confirm = window.confirm("Do you want to delete!");
    if (!confirm || !columnId) return;
    // Delete Column Via Column Id
    setColumns(columns.filter((prev) => prev.id !== columnId));
  }
  //Method for Card
  function updateCard(cardId: number | string, value: string) {
    if (!cardId || !value) {
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === cardId ? { ...task, content: value.trim() } : task
      )
    );
  }
  function deleteCard(cardId: number | string) {
    if (!cardId) return;
    setTasks((prev) => prev.filter((card) => card.id !== cardId));
  }

  return (
    <DragContext.Provider value={initialValueContext}>
      <DragBoard />
    </DragContext.Provider>
  );
};

export default DragContextContainer;
