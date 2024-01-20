import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Select from "./Select";
import { useParams } from "react-router-dom";
import { getItemInLocalStorage } from "@/utils/helper";
import { UniqueIdentifier } from "@dnd-kit/core";
import { NAME_STORE_LOCAL } from "@/utils/constant.app";
import { useAppSelector } from "@/store/hooks";
import { ICard } from "@/types/Data.type";
import Button from "@/components/UI/Button";

interface DestinationProps {}
export interface IDestination {
  boardId: UniqueIdentifier | undefined;
  columnId: UniqueIdentifier | undefined;
  position: number | undefined;
}
const Destination: FC<DestinationProps> = () => {
  const { boardId } = useParams();

  const { card_select } = useAppSelector((state) => state.card);

  const cardIndex = useMemo(() => {
    const data = localStorage.getItem(boardId + NAME_STORE_LOCAL.PREFIX_BOARD_CARDS);
    if (!data) return undefined;

    const cards: ICard[] = JSON.parse(data)[card_select.columnId];
    return cards?.findIndex((card) => card._id === card_select._id) + 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [destination, setDestination] = useState<IDestination>({
    boardId,
    columnId: card_select.columnId,
    position: cardIndex,
  });

  const getDataBoards = useCallback(async () => {
    const { list } = await getItemInLocalStorage("persist:list_board");
    return list ? JSON.parse(list) : [];
  }, []);

  const getDataColumns = useCallback(async () => {
    console.log({ boardIdChange: destination.boardId });
    const key = destination.boardId ? destination.boardId : boardId;
    const data = await getItemInLocalStorage(key + NAME_STORE_LOCAL.PREFIX_BOARD_COLUMNS);

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination.boardId]);

  const getDataPositionCard = useCallback(async () => {
    const key = destination.boardId ? destination.boardId : boardId;
    const data = await getItemInLocalStorage(key + NAME_STORE_LOCAL.PREFIX_BOARD_CARDS);
    const columnId = destination.columnId ? destination.columnId : card_select.columnId;

    const cards = data[columnId]?.map((_: ICard, index: number) => ({
      title: index + 1,
      _id: index + 1,
    }));

    if (cards) cards.push({ title: cards.length + 1, _id: cards.length + 1 });

    console.log({
      cards,
    });

    return cards ? cards : [{ title: 1, _id: 1 }];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination.columnId, destination.boardId]);

  useEffect(() => {
    console.log({ destination });
    getDataPositionCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);
  useEffect(() => {
    console.log("columnId Change");
  }, [destination.boardId]);
  return (
    <Container>
      <Select
        label="Boards"
        defaultId={destination.boardId}
        property="boardId"
        getData={getDataBoards}
        setDestination={setDestination}
        keyCurrent={boardId}
      />
      <Select
        label="Columns"
        defaultId={destination.columnId}
        getData={getDataColumns}
        property="columnId"
        setDestination={setDestination}
        keyCurrent={card_select.columnId}
      />
      <Select
        label="Position"
        defaultId={destination.position}
        getData={getDataPositionCard}
        property="position"
        setDestination={setDestination}
        keyCurrent={""}
      />
      <Button disable={false}> Move </Button>
    </Container>
  );
};

export default Destination;

const Container = styled.div`
  margin: 10px;
`;
