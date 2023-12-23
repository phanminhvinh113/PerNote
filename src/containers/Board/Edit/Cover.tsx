import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useBoardContext from "@/hooks/useBoardContext";
import { ListImageTemplate } from "@/utils/constant.template";
import CloseIcon from "@mui/icons-material/Close";
import { IRect } from "@/types/Data.type";
import { setCardSelect } from "@/store/features/card/cardSlice";

interface ICoverProps {}

const Cover: FC<ICoverProps> = () => {
  const dispatch = useAppDispatch();

  const [isOpenFillLink, setIsOpenFillLink] = useState<boolean>(false);

  const refInputLink = useRef<HTMLInputElement | null>(null);
  const { updateCoverCard, removeCoverCard } = useBoardContext();

  const { card_select: card, rect_card } = useAppSelector((state) => state.card);

  const handleToggleOpenFillLink = () => {
    setIsOpenFillLink((prev) => !prev);
  };

  const handleSetLink = (cover: string) => {
    dispatch(setCardSelect({ ...card, cover }));
    updateCoverCard(card.columnId, card._id, cover);
  };
  const handleGetLinkCover = () => {
    const cover = refInputLink.current?.value.trim();
    if (!card?._id || !card?.columnId || !cover) {
      return;
    }
    updateCoverCard(card.columnId, card._id, cover);
  };

  const handleRemoveCover = () => {
    if (!card?.columnId || !card._id) return;

    removeCoverCard(card.columnId, card._id);
    dispatch(setCardSelect({ ...card, cover: null }));
  };
  useEffect(() => {
    if (isOpenFillLink) {
      refInputLink.current?.focus();
      refInputLink.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isOpenFillLink]);

  return (
    <Container rect_card={rect_card}>
      <Header>
        <Title> Cover</Title>
        <Icon>
          <CloseIcon />
        </Icon>
      </Header>
      <Body className="body-editor_cover">
        {/* 
            Skeleton Cover Selecting
         */}
        <Description>Card</Description>
        <Card sx={{ maxWidth: "80%", margin: "0 auto", borderRadius: 3 }}>
          {card?.cover ? (
            <CardMedia
              sx={{ opacity: 0.6, height: "120px" }}
              component="img"
              alt="green iguana"
              height="140px"
              image={card?.cover || ""}
            />
          ) : (
            <Skeleton height={115} animation="wave" variant="rectangular" />
          )}

          <CardContent sx={{ padding: "10px", paddingBottom: "10px!important", position: "relative" }}>
            <Skeleton sx={{ borderRadius: "6px" }} animation="wave" width={"30%"} height={18} />
            <Skeleton sx={{ borderRadius: "6px" }} animation="wave" width={"80%"} height={18} />
            <Skeleton variant="circular" height={20} width={20} />
          </CardContent>
        </Card>
        <ButtonMain onClick={handleRemoveCover}> Remove Cover</ButtonMain>
        {/* TEMPLATE IMAGE */}
        <Description>Templates</Description>
        <TemplateList>
          {ListImageTemplate.map((item, index) => (
            <Image onClick={() => handleSetLink(item.url)} key={index} src={item.url}></Image>
          ))}
        </TemplateList>

        {/*
        
         */}

        {!isOpenFillLink && <ButtonMain onClick={handleToggleOpenFillLink}>Upload Cover With Link</ButtonMain>}
        {/* 
  
           */}
        {isOpenFillLink && (
          <Wrapper className="mt-5">
            <Input placeholder="Typing A Link..." className="flex m-auto" ref={refInputLink} type="text" />
            <div className="flex justify-around">
              <ButtonMain onClick={handleGetLinkCover}>Upload</ButtonMain>

              <ButtonMain onClick={handleToggleOpenFillLink}>Close</ButtonMain>
            </div>
          </Wrapper>
        )}
      </Body>
    </Container>
  );
};

export default Cover;

const Container = styled.div<{ rect_card: IRect }>`
  background-color: #282e33;
  border-radius: 8px;
  box-shadow: 0 8px 12px #091e4226;
  overflow: hidden;
  width: 365px;
  z-index: 1200;
  position: fixed;
  top: 20px;
  left: ${(props) => props.rect_card.right + 20}px;
  padding: 10px;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 40px;
  margin-bottom: 15px;
  text-align: center;
  align-items: center;
  position: relative;
  color: #9fadbc;
`;
const Body = styled.div`
  max-height: calc(100vh - 54px - 100px);
  overflow-y: overlay;
`;
const Title = styled.span`
  display: block;
  font-size: 1.35em;
  font-weight: 600;
  grid-column: 1 / span 3;
  grid-row: 1;
  height: 40px;
  letter-spacing: -0.003em;
  line-height: 40px;
  margin: 0;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
`;
const Icon = styled.span`
  color: #9fadbc;
  border-radius: 8px;
  grid-column: 3;
  grid-row: 1;
  padding: 6px;
  z-index: 2;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const TemplateList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  overflow-x: hidden;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 10px;
`;
const Image = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  border-radius: 6px;
  height: 65px;
  width: 100px;
`;

const ButtonMain = styled.button`
  background-color: #394047;
  margin: 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  display: inline-block;
  line-height: 20px;
  padding: 14px 12px;
  position: relative;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.1em;
  color: #b6c2cf;
  margin: 20px auto;
  display: grid;
  &:hover {
    background-color: #535659;
  }
`;
const Wrapper = styled.div``;
const Input = styled.input`
  width: 98%;
  padding: 10px 20px;
  outline: none;
  border-radius: 25px;
  border: 1px solid #ccc;
  color: #373738;
  background-color: #bdc2c7;
`;
const Description = styled.div`
  font-style: italic;
  color: #9fadbc;
  font-size: 15px;
  font-weight: 700;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
`;
