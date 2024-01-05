import { Box, Button } from "@mui/material";
import { FC, useRef, useState } from "react";
import ToggleThemeMode from "./ToggleTheme";
import { APP } from "@/style/constant.style";
import AddBoard from "../Home/Board/AddBoard";
import Menu from "@/components/UI/Menu";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false);
  const refAnchorEl = useRef<HTMLDivElement | null>(null);

  const handleOnClick = () => {
    setIsOpenAction(true);
  };
  const onClose = () => {
    setIsOpenAction(false);
  };
  return (
    <Box
      sx={{
        height: APP.HeaderHeight,
        display: "flex",
        alignItems: "center",
        borderBottom: " solid 1px #ccc",
      }}
    >
      <Button variant="contained">Contained</Button>

      <ToggleThemeMode />
      <div ref={refAnchorEl}>
        <Button variant="contained" onClick={handleOnClick}>
          Create New Board
        </Button>
      </div>
      {isOpenAction && (
        <Menu anchorEl={refAnchorEl} open={isOpenAction} onClose={onClose} top={40} left={40}>
          <AddBoard />
        </Menu>
      )}
    </Box>
  );
};

export default Header;
