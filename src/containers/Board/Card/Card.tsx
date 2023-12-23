import { FC, memo, useMemo, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { ICard, Type } from "@/types/Data.type";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { THEME_MODE } from "@/utils/constant.app";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCardSelect, setIsNewCard } from "@/store/features/card/cardSlice";
import { setIsDisableDragColumn } from "@/store/features/column/columnSlice";
import useBoardContext from "@/hooks/useBoardContext";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import CardEditor from "./CardEditor";
import BackDrop from "./BackDrop";
import Editable from "./Editable";
import PencilEdit from "./PencilEdit";

interface ICardProps {
  card: ICard;
}

// eslint-disable-next-line react-refresh/only-export-components
const CardItem: FC<ICardProps> = ({ card }) => {
  const dispatch = useAppDispatch();

  const isNewCard = useAppSelector((state) => state.card.isNewCard);
  const cardIdSelect = useAppSelector((state) => state.card.card_id);
  const { updateCard, deleteCard } = useBoardContext();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const refCard = useRef<HTMLDivElement | null>(null);
  const refContainerMenu = useRef<HTMLDivElement | null>(null);

  //
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: {
      type: Type.CARD,
      dataDrag: card,
    },
    disabled: isEditMode,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);

    if (!isEditMode) {
      dispatch(setCardSelect(card));
      dispatch(setIsDisableDragColumn(true));
    }
  };

  const handleDeleteCard = () => {
    deleteCard(card?.columnId, card._id);
    toggleEditMode();
    dispatch(setIsNewCard(false));
  };

  const updateTitleCard = () => {
    const textTitle = contentEditableRef.current?.textContent?.trim();

    if (!textTitle || card.title === textTitle) {
      return setIsEditMode(false);
    }

    updateCard(card?.columnId, card?._id, textTitle);
    setIsEditMode(false);
    dispatch(setIsNewCard(false));
    dispatch(setIsDisableDragColumn(false));
  };

  const handleDelayFocus = () => {
    setTimeout(() => {
      setIsEditMode(true);
    }, 500);
  };

  useScrollIntoView({
    condition: isNewCard && cardIdSelect === card._id ? true : false,
    ref: refCard,
    dependencies: [isNewCard, cardIdSelect],
    func: handleDelayFocus,
  });

  const cardStyle = useMemo(
    () => ({
      width: "100%",
      border: (theme: {
        palette: {
          mode: string;
        };
      }) => (theme.palette.mode === THEME_MODE.Light ? "1px solid #b0cbc7" : "1px solid #4b4949"),
      borderRadius: "8px",
      gap: 1,
      m: "10px 0",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      overflow: "hidden",
      "&:hover": {
        "& .editButton": {
          visibility: "visible",
        },
      },
      zIndex: (theme: {
        zIndex: {
          drawer: number;
        };
      }) => (isEditMode ? theme.zIndex.drawer + 1003 : undefined),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditMode]
  );
  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card ref={refCard} className={styledCardContainer} sx={cardStyle}>
        <CardMedia sx={{ width: "100%" }}>
          {card?.cover && <CardMedia component="img" height="140" image={card?.cover} />}
          <CardContent sx={{ paddingBottom: "16px!important" }}>
            <Editable
              refEditTable={contentEditableRef}
              isDragging={isDragging}
              isEditMode={isEditMode}
              title={card?.title}
            />
            <Typography fontSize={10} color="text.secondary">
              {card?.description}
            </Typography>
            {!isEditMode && <PencilEdit toggleEditMode={toggleEditMode} />}
          </CardContent>
        </CardMedia>
      </Card>

      {isEditMode && !isNewCard && <CardEditor refMenu={refContainerMenu} refCard={refCard} />}

      <BackDrop
        updateTitleCard={updateTitleCard}
        handleDeleteCard={handleDeleteCard}
        isEditMode={isEditMode}
        refEditTable={contentEditableRef}
        refContainerMenu={refContainerMenu}
        refCard={refCard}
      />
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CardItem);

const styledCardContainer = "bg-gray-800 items-center flex text-left rounded-xl cursor-grab relative";
