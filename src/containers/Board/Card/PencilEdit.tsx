import React, { memo, useMemo } from "react";
import Button from "@mui/material/Button";
import PencilIcon from "@/assets/Icons/PencilIcon";

interface PencilEditProps {
  toggleEditMode: () => void;
}

const PencilEdit: React.FC<PencilEditProps> = memo(({ toggleEditMode }) => {
  const styleButton = useMemo(
    () => ({
      position: "absolute",
      top: 2,
      right: 5,
      minWidth: "35px !important",
      height: "30px",
      visibility: "hidden",
      marginTop: "5px",
    }),
    []
  );
  return (
    <Button sx={styleButton} className="editButton" onClick={toggleEditMode}>
      <PencilIcon
        style={{
          width: "1.2em",
          height: "1.2em",
        }}
      />
    </Button>
  );
});

export default PencilEdit;
