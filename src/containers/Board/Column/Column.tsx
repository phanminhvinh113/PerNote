import { HTMLAttributes, useRef, FC, useState, memo, useMemo } from "react";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { IColumn, Type } from "@/types/Data.type";
import { APP } from "@/style/constant.style";
import Header from "./Header";
import ListCard from "../ListCard/ListCard";
import ButtonModify from "./ButtonModify";
import "@/style/DragList.css";
import { useAppSelector } from "@/store/hooks";
import useBoardContext from "@/hooks/useBoardContext";

//-----------------------------------------------------------------------------//

interface IColumnProps extends HTMLAttributes<HTMLDivElement> {
  column: IColumn;
}
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });
//-----------------------------------------------------------------------//

// eslint-disable-next-line react-refresh/only-export-components
const Column: FC<IColumnProps> = ({ column }) => {
  const { listCard } = useBoardContext();
  const isNewColumn = useAppSelector((state) => state.column.isNewColumn);
  const isDisableDragColumn = useAppSelector((state) => state.column.isDisableDragColumn);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cards = useMemo(() => listCard[column._id], [column._id, listCard[column._id]]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const containerListCardRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: {
      type: Type.COLUMN,
      dataDrag: column,
    },
    disabled: isEditMode || isNewColumn || isDisableDragColumn,
    animateLayoutChanges,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
    cursor: "context-menu",
  };

  return (
    <Box ref={setNodeRef} {...attributes} style={style}>
      <Box
        {...listeners}
        className={containerStyle}
        sx={{
          width: APP.WithColumn,
          height: "fit-content",
          bgcolor: (theme) => (theme.palette.mode == "light" ? "#bdcdc9" : "#192129"),
          cursor: "pointer",
        }}
      >
        <Header column={column} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        <Box
          sx={{
            maxHeight: APP.MaxHeightColumn,
            "&::-webkit-scrollbar": {
              width: "0px", // Set the width of the scrollbar
            },
          }}
          ref={containerListCardRef}
          className={sortTableListStyle}
        >
          <ListCard cards={cards} columnId={column._id} />
        </Box>
        {/* Button Add New Card*/}
        <ButtonModify columnId={column._id} />
      </Box>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Column);

// STYLE
const containerStyle: string = `overflow-x-hidden h-auto overflow-y-auto  pt-2 p-b-20 rounded-md flex flex-col px-[10px]`;

const sortTableListStyle: string = "flex flex-col gap-4 overflow-x-hidden ";
