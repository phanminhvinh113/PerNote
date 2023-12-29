import useBoardContext from "@/hooks/useBoardContext";
import { ICard, IColumn, Type } from "@/types/Data.type";
import {
  CollisionDetection,
  UniqueIdentifier,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { useCallback, useRef } from "react";

interface CollectionDetectionProp {
  activeDragType: Type | null;
  activeData: IColumn | ICard | null;
}
function CollisionDetectionStrategy({ activeDragType, activeData }: CollectionDetectionProp) {

  const { listColumn } = useBoardContext();
  const lastOverId = useRef<UniqueIdentifier>();
  const recentlyMovedToNewContainer = useRef(false);

  const containId = useCallback(
    (id: UniqueIdentifier): boolean => {
      listColumn?.forEach((column) => {
        if (column._id === id) return true;
      });
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */

  
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {

      if (activeDragType === Type.CARD) {
    
        return closestCenter({
          ...args,
        });
        // return closestCorners({
        //   ...args,
        // });
      }
     
      // if (activeData?._id && containId(activeData?._id)) {
      //   console.log(containId(activeData?._id))

      //   console.log("collision column")
      //   return closestCenter({
      //     ...args,
      //     droppableContainers: args.droppableContainers.filter((container) => containId(container.id)),
      //   });
      // }
   
      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);

      let overId = getFirstCollision(intersections, "id");
      console.log({overId})

      if (overId != null) {
        if (containId(overId)) {
          const containerItems = listColumn.find((column) => column._id === overId);

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems && containerItems.cards.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && containerItems.cards.findIndex((card) => card._id === container.id) !== -1
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeData?._id;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeData?._id, listColumn]
  );
  return collisionDetectionStrategy;
}

export default CollisionDetectionStrategy;
