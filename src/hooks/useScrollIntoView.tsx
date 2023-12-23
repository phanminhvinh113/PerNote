import { useEffect } from "react";

interface UseScrollIntoViewProps {
  ref: React.RefObject<HTMLElement>;
  condition: boolean;
  dependencies: Array<unknown>;
  func?: VoidFunction;
  block?: "start" | "center" | "end" | "nearest";
}

function useScrollIntoView({ ref, condition, dependencies, func, block = "start" }: UseScrollIntoViewProps) {
  useEffect(() => {
    if (condition && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block,
      });

      func && func();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
}

export default useScrollIntoView;
