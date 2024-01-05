import { useEffect } from "react";

type UseClickOutsideProps = {
  refs: React.RefObject<HTMLElement>[];
  handler: () => void;
  dependencies: Array<unknown>;
  condition?: boolean[];
};

function useClickOutside({ refs, handler, dependencies, condition }: UseClickOutsideProps) {
  const handleClickOutside = (event: MouseEvent) => {
    const isPrevent = condition && condition.includes(false);

    if (isPrevent !== undefined && isPrevent) return;

    const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target as Node));

    if (isOutside) handler();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useClickOutside;
