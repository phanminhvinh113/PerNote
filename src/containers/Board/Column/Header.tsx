import { Dispatch, FC, SetStateAction, memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IColumn } from "@/types/Data.type";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsNewColumn } from "@/store/features/column/columnSlice";
import Menu from "@/components/UI/Menu";
import BoardAction from "./BoardAction";
import useBoardContext from "@/hooks/useBoardContext";

interface IHeaderProps {
  column: IColumn;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}
// Define the ref type

// eslint-disable-next-line react-refresh/only-export-components
const Header: FC<IHeaderProps> = ({ column, isEditMode, setIsEditMode }) => {
  const dispatch = useAppDispatch();
  const isNewColumn = useAppSelector((state) => state.column.isNewColumn);
  const { updateTitleColumn } = useBoardContext();
  const { boardId } = useParams();
  const [titleColumn, setTitleInput] = useState<string>(column?.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (inputRef.current && isNewColumn) {
      inputRef.current?.focus();
    }
  }, [dispatch, isNewColumn]);

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenAction(true);
  };
  const onClose = () => {
    setIsOpenAction(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <div className={headerStyle}>
        <div className={titleStyle} onDoubleClick={onDoubleClickTitle}>
          {isEditMode || !column.title ? (
            <input
              ref={inputRef}
              value={titleColumn}
              placeholder="Typing Title Here...!"
              className={inputStyle}
              onBlur={() => {
                handleUpdateTitle(column._id, titleColumn);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUpdateTitle(column._id, titleColumn);
                }
              }}
              onChange={(e) => {
                if (!isEditMode) {
                  setIsEditMode(true);
                }
                handleOnChangeInputTitle(e.target.value);
              }}
            />
          ) : (
            <Typography sx={{ fontSize: "0.8em" }} variant="subtitle1" fontWeight={600}>
              {column?.title}
            </Typography>
          )}
        </div>

        <IconButton onClick={handleOnClick}>
          <MoreVertIcon sx={{ height: "0.8em", width: "0.8em" }} />
        </IconButton>
        {isOpenAction && (
          <Menu anchorEl={anchorEl} open={isOpenAction} onClose={onClose} left={60} top={-30}>
            <BoardAction onClose={onClose} />
          </Menu>
        )}
      </div>
    </Box>
  );

  //---------------------------------------------------------------------//

  /**
   *    UPDATE TITLE COLUMN
   *
   * @param columnId
   * @param value
   * @returns
   */

  function handleUpdateTitle(columnId: UniqueIdentifier, value: string) {
    if (!boardId) return;

    if (value.trim()) {
      updateTitleColumn(columnId, value);
    }

    setIsEditMode(false);
    dispatch(setIsNewColumn(false));
  }

  /**
   *  HANDLE IF USER DOUBLE CLICK TO CHANGE STATE EDIT INPUT TITLE
   *
   */

  function onDoubleClickTitle() {
    setIsEditMode(true);
  }

  /**
   *
   * @param value
   */
  function handleOnChangeInputTitle(value: string) {
    setTitleInput(value);
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Header);

const headerStyle = "mx-auto p-2 w-full flex items-center justify-between";
//
const titleStyle = "w-[80%] break-words min-h-[30px] ";
//
const inputStyle = "focus:outline-none focus-visible-bb focus:ring-0 w-[100%] p-[10px] rounded-lg  bg-transparent ";
//

//
