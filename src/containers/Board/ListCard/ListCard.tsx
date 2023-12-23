import { FC, useMemo } from "react";
import Box from "@mui/material/Box";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Card from "../Card/Card";
import { Id } from "@/types/Column";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ICard } from "@/types/Data.type";

interface ListCardProps {
  columnId: UniqueIdentifier;
  cards: ICard[];
}

// eslint-disable-next-line react-refresh/only-export-components
const ListCard: FC<ListCardProps> = ({ cards }) => {
  const listCardIds: Id[] = useMemo(() => cards.map((card) => card._id), [cards]);

  return (
    <Box>
      <SortableContext items={listCardIds} strategy={verticalListSortingStrategy}>
        {!!cards.length && cards.map((card) => <Card key={card._id} card={card} />)}
      </SortableContext>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default ListCard;
