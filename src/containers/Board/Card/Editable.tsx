import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EditableComponentProps {
  isEditMode: boolean;
  isDragging: boolean;
  title: string;
  refEditTable: React.RefObject<HTMLDivElement>;
}

const Editable: FC<EditableComponentProps> = ({ isEditMode, isDragging, title, refEditTable }) => {
  if (isEditMode)
    return (
      <Box
        sx={{
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          width: "100%",
        }}
        ref={refEditTable}
        data-text="Typing Task..."
        className={isDragging ? "invisible" : inputStyle}
        contentEditable={isEditMode || title}
        dangerouslySetInnerHTML={{ __html: title || "" }}
      />
    );

  return (
    <Typography
      ref={refEditTable}
      sx={{ fontSize: "0.7em", wordBreak: "break-word", whiteSpace: "pre-wrap", width: "100%" }}
      fontWeight={600}
      component="div"
    >
      {title}
    </Typography>
  );
};

export default Editable;

const inputStyle = "w-full  border-none rounded bg-transparent text-white cursor-text focus:outline-none ";
