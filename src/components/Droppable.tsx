import { FC, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
interface IDroppable {
  children: ReactNode;
}
const Droppable: FC<IDroppable> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
