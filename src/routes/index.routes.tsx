import { createBrowserRouter } from "react-router-dom";
import { PATH } from "../utils/constant.path";
import HomePage from "../page/Home.page";
import ErrorPage from "../page/Error.page";
import NotFoundPage from "../page/NotFound.page";
import BoardContextContainer from "@/context/BoardContext";

export const router = createBrowserRouter([
  {
    path: PATH.home,
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.dashboard,
    element: <BoardContextContainer />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.notfound,
    element: <NotFoundPage />,
  },
]);
