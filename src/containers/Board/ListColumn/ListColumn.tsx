import { FC, useEffect, useMemo, useRef } from "react";
import { IColumn } from "@/types/Data.type";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "../Column/Column";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsNewColumn } from "@/store/features/column/columnSlice";
import useBoardContext from "@/containers/Board/hooks/useBoardContext";

//
interface IListColumnProps {
  columns: IColumn[];
}

// eslint-disable-next-line react-refresh/only-export-components
const ListColumn: FC<IListColumnProps> = ({ columns }) => {
  const dispatch = useAppDispatch();
  const { createNewColumn } = useBoardContext();
  const { isNewColumn } = useAppSelector((state) => state.column);

  const listColumnIds = useMemo(() => columns.map((column) => column._id), [columns]);

  //Ref For Scroll Horizontal Column
  const containerRef = useRef<HTMLDivElement>(null);

  //Scrolling To Left End Document When Add New Column Into List
  useEffect(() => {
    if (isNewColumn) scrollToRightEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns.length]);

  return (
    <Box
      ref={containerRef}
      sx={{ gap: 2, overflowX: "auto", whiteSpace: "nowrap", height: "100%", width: "100%", padding: "20px" }}
      className="flex"
    >
      <SortableContext items={listColumnIds} strategy={horizontalListSortingStrategy}>
        {!!columns.length && columns?.map((column) => <Column key={column._id} column={column} />)}
      </SortableContext>

      {/* Button Add New Column */}
      <Button
        sx={{
          minWidth: "300px",
          border: "1px solid",
        }}
        className={buttonAddColumnStyle}
        onClick={handleCreateColumn}
      >
        <LibraryAddIcon sx={{ marginRight: "15px", fontSize: "30px" }} />
        <Typography fontSize={18} fontWeight={600}>
          Add Column
        </Typography>
      </Button>
    </Box>
  );

  function handleCreateColumn() {
    dispatch(setIsNewColumn(true));
    return createNewColumn();
  }

  function scrollToRightEnd() {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export default ListColumn;

const buttonAddColumnStyle = "flex gap-2 items-center h-[50px] border-2 rounded-md p-2 border-x-columnBackgroundColor";
