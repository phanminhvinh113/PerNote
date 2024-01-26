import { IRect } from "@/types/Data.type";
import { useEffect, useCallback, useState, useLayoutEffect } from "react";

interface IUseResize {
  rect: IRect | undefined;
  componentRef: React.RefObject<HTMLElement>;
  left: number;
  right: number;
  top: number;
  delay?: number;
}
const useResize = ({ rect, componentRef, left, right, top, delay = 0 }: IUseResize) => {
  const [viewLeft, setViewLeft] = useState<number>(rect ? rect.left : 0);
  const [viewHeight, setViewHeight] = useState<number>(rect ? rect.right : 0);

  const calculateDistance = useCallback(() => {
    if (componentRef.current) {
      const rectComponent = componentRef.current.getBoundingClientRect() as IRect;

      if (rect && rect.left + rectComponent.width < window.innerWidth) {
        setViewLeft(rect.left + left - right);
      } else {
        setViewLeft(-10);
      }

      if (rect && rect.top + rectComponent.height < window.innerHeight) {
        setViewHeight(rect.top + top);
      } else {
        setViewHeight(-10);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentRef, rect]);

  useLayoutEffect(() => {
    console.log("check view");
    if (componentRef.current) {
      const rectComponent = componentRef.current.getBoundingClientRect() as IRect;
      console.log(componentRef.current.clientHeight);
      console.log({
        rectComponent,
        rect,
        viewHeight: innerHeight,
        result: rect && rect.top + rectComponent.height - window.innerHeight,
      });

      if (rect && rect.left + rectComponent.width < window.innerWidth) {
        setViewLeft(rect.left + left - right);
      } else {
        setViewLeft(-10);
      }

      if (rect && rect.top + componentRef.current.clientHeight < window.innerHeight) {
        setViewHeight(rect.top + top);
      } else {
        setViewHeight(-10);
      }
    }
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;

    calculateDistance();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        calculateDistance();
      }, delay);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [viewLeft, viewHeight];
};

export default useResize;
