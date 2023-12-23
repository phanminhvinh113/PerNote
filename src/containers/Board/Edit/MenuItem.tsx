import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ImageIcon from "@mui/icons-material/Image";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";

/**********************************************************8 */
import Cover from "./Cover";
import { IListCard, TypeElementMenu } from "@/types/Data.type";
import { UniqueIdentifier } from "@dnd-kit/core";
import { getItemInLocalStorage } from "@/utils/helper";
import { NAME_STORE_LOCAL } from "@/utils/constant.app";

const deleteCard = async (boardId: UniqueIdentifier, columnId: UniqueIdentifier, cardId: UniqueIdentifier) => {
  console.log({ boardId, columnId, cardId });

  const listCard: IListCard = await getItemInLocalStorage(boardId + NAME_STORE_LOCAL.PREFIX_BOARD_CARDS);

  const cards = listCard[columnId];

  if (!cards) return;

  return cards.filter((card) => card._id !== cardId);
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
