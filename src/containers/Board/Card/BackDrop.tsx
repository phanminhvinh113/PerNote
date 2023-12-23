import React, { ReactNode, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useClickOutside from "@/hooks/useClickOutSide";
import { useAppSelector } from "@/store/hooks";

interface BackDropProp {
  isEditMode: boolean;
  refEditTable: React.RefObject<HTMLElement>;
  refContainerMenu: React.RefObject<HTMLElement>;
  refCard: React.RefObject<HTMLElement>;
  handleDeleteCard: VoidFunction;
  updateTitleCard: VoidFunction;
}

const BackDrop: React.FC<BackDropProp> = ({
  isEditMode,
  updateTitleCard,
  handleDeleteCard,
  refEditTable,
  refCard,
  refContainerMenu,
}) => {
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const isNewCard = useAppSelector((state) => state.card.isNewCard);

  const handleCloseAlert = () => {
    setIsAlert(false);
    refEditTable.current?.focus();
  };
  const handleAlertCreateCard = () => {
    setIsAlert(true);
  };

  const handleClickOutside = () => {
    const textTitle: string | undefined = refEditTable.current?.textContent?.trim();

    if (!textTitle && isNewCard) {
      return handleAlertCreateCard();
    }

    updateTitleCard();
  };

  useClickOutside({
    refs: isNewCard ? [refCard] : [refCard, refContainerMenu],
    dependencies: [isEditMode, isAlert],
    handler: handleClickOutside,
    condition: [!isAlert, isEditMode],
  });

  useEffect(() => {
    if (isEditMode) refEditTable?.current?.focus();
  }, [isEditMode, refEditTable]);

  const actionAlertRemoveCard: ReactNode = (
    <Box>
      <Box>
        <Typography variant="h6" fontWeight={600}>
          YOU DON'T WANT TO CREATE NEW CARD
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px", gap: 2 }}>
        <Button variant="contained" onClick={handleDeleteCard}>
          Yes
        </Button>
        <Button variant="contained" onClick={handleCloseAlert}>
          No
        </Button>
      </Box>
    </Box>
  );

  return (
    <Backdrop open={isEditMode} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1000 }}>
      <Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isAlert} // Assuming isAlert is declared somewhere in your component
          key={"top" + "center"}
          message={actionAlertRemoveCard} // Assuming actionAlertRemoveCard is declared somewhere in your component
        />
      </Box>
    </Backdrop>
  );
};

export default BackDrop;
