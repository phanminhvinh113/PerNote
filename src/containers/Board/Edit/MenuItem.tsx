import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ImageIcon from "@mui/icons-material/Image";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";

/**********************************************************8 */
import Cover from "./Cover";
import { IColumn, TypeElementMenu } from "@/types/Data.type";
import { UniqueIdentifier } from "@dnd-kit/core";
import { getItemInLocalStorage } from "@/utils/helper";

const deleteCard = async (boardId: string, columnId: UniqueIdentifier, cardId: UniqueIdentifier) => {
  console.log({ boardId, columnId, cardId });

  const columns: IColumn[] = await getItemInLocalStorage(boardId);

  console.log({ columns });

  if (!columns) return;

  return columns.map((column) => {
    if (column._id !== columnId) return column;
    column.cards = column.cards.filter((card) => card._id !== cardId);
    return column;
  });
};

export const MenuEdit: TypeElementMenu[] = [
  {
    title: "Open Card",
    icon: <CreditCardIcon />,
    component: <CreditCardIcon />,
  },
  {
    title: "Edit Label",
    icon: <BookmarksIcon />,
    component: <CreditCardIcon />,
  },

  {
    title: "Change Cover",
    icon: <ImageIcon />,
    component: <Cover />,
  },
  {
    title: "Move",
    icon: <TrendingFlatIcon />,
    component: <CreditCardIcon />,
  },
  {
    title: "Change Date",
    icon: <QueryBuilderIcon />,
  },
  {
    title: "Delete",
    icon: <CreditCardOffIcon />,
    method: deleteCard,
  },
];
