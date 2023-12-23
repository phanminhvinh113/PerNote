import { useEffect, useState } from "react";

type UseClickOutsideProps = {
  refs: React.RefObject<HTMLElement>[];
  handler: () => void;
  dependencies: Array<unknown>;
  condition?: boolean[];
};

function useClickOutside({ refs, handler, dependencies, condition }: UseClickOutsideProps): boolean {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    const isPermission = condition && condition.includes(false);

    if (isPermission !== undefined && isPermission) return;

    const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target as Node));

    if (isOutside) {
      handler();
      setIsClickedOutside(true);
    } else {
      setIsClickedOutside(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return isClickedOutside;
}

export default useClickOutside;
