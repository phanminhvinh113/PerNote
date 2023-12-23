import { FC } from "react";
import { Box } from "@mui/material";
import { STYLED_DEFAULT } from "@/style/constant.style";
import ListColumn from "./ListColumn/ListColumn";
import { DndContext, MeasuringStrategy } from "@dnd-kit/core";

import useBoardContext from "@/hooks/useBoardContext";
import EventDrag from "./EventDrag";
import useSensorConfig from "./hooks/useSensor.config";
import CollisionDetectionStrategy from "./CollisionDetectionStrategy";
import OverLay from "./OverLay";
import { THEME_MODE } from "@/utils/constant.app";

interface IDashBoardBoardProps {}
//

const DashBoard: FC<IDashBoardBoardProps> = () => {
  /********** *************** *********** ************* ******* */

  const { listColumn } = useBoardContext();

  const { onDragStart, onDragOver, onDragEnd, activeData, activeDragType } = EventDrag();

  const collisionDetectionStrategy = CollisionDetectionStrategy({
    activeData,
    activeDragType,
  });

  const sensors = useSensorConfig();

  const backGroundStyle = {
    background: (theme: { palette: { mode: string } }) =>
      theme.palette.mode == THEME_MODE.Light
        ? STYLED_DEFAULT.backGroundAppBarLight
        : STYLED_DEFAULT.backGroundAppBarDark,
  };

  return (
    <Box className={containerStyle} sx={backGroundStyle}>
      <DndContext
        sensors={sensors}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <ListColumn columns={listColumn} />
        <OverLay activeData={activeData} activeDragType={activeDragType} />
      </DndContext>
    </Box>
  );
};

export default DashBoard;

//Styled Component
const containerStyle = `w-full h-full`;
