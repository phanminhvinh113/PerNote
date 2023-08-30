import { FunctionComponent, ReactNode } from "react";
import PlusIcon from "../assets/Icons/PlusICon";

interface IButtonProps {
  handleCreateNew: () => void;
  children: ReactNode;
}
const style =
  " ml-2 h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-2 ring-rose-500 hover:ring-2 flex gap-2";
const Button: FunctionComponent<IButtonProps> = ({
  handleCreateNew,
  children,
}) => {
  return (
    <button
      onClick={() => {
        handleCreateNew();
      }}
      className={style}
    >
      <PlusIcon />
      {children}
    </button>
  );
};

export default Button;
