import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import ToggleThemeMode from "./ToggleTheme";
import { APP } from "@/style/constant.style";
import AddBoard from "../Home/Board/AddBoard";
import Menu from "@/components/UI/Menu";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
      <Button variant="contained" onClick={handleOnClick}>
        Create New Board
      </Button>
      {isOpenAction && (
        <Menu anchorEl={anchorEl} open={isOpenAction} onClose={onClose} top={40} left={40}>
          <AddBoard />
        </Menu>
      )}
    </Box>
  );
};

export default Header;
