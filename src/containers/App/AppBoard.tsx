import { FunctionComponent } from "react";
import { RouterProvider } from "react-router-dom";
import Box from "@mui/material/Box";
import { router } from "@/routes/index.routes";
import { APP } from "@/style/constant.style";

interface AppBoardProps {}

const AppBoard: FunctionComponent<AppBoardProps> = () => {
  return (
    <Box
      sx={{
        height: APP.AppBarHeight,
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
};

export default AppBoard;
