import Button from "@mui/material/Button";
import { FC, memo } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useAppDispatch } from "@/store/hooks";
import useBoardContext from "@/containers/Board/hooks/useBoardContext";
import { setIsNewCard } from "@/store/features/card/cardSlice";

interface ButtonModifyProps {
  columnId: UniqueIdentifier;
}

const ButtonModify: FC<ButtonModifyProps> = ({ columnId }) => {
  const { createNewCard } = useBoardContext();
  const dispatch = useAppDispatch();
  function createCard(columnId: number | string) {
    dispatch(setIsNewCard(true));
    return createNewCard(columnId);
  }
  return (
    <Button
      sx={{
        m: 1,
      }}
      className={buttonAddCardStyle}
      onClick={() => createCard(columnId)}
    >
      <AddCardIcon />
      Add new card
    </Button>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ButtonModify);
const buttonAddCardStyle: string = "flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-2   ";
