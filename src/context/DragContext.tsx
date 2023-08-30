import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Column, Task } from "../types/Column";
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
};
export const DragContext = createContext<typeContext>({
  tasks: [],
  setTasks: () => {},
  columns: [],
  setColumns: () => {},
});
//
interface DragContextProps {
  children: ReactNode;
}

const DragContextContainer: FunctionComponent<DragContextProps> = ({
  children,
}) => {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  //
  const initialValueContext: typeContext = {
    tasks,
    setTasks,
    columns,
    setColumns,
  };
  //
  return (
    <DragContext.Provider value={initialValueContext}>
      {children}
    </DragContext.Provider>
  );
};

export default DragContextContainer;
