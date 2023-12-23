import { ReactNode } from "react";

export type TAction = {
  title: string;
  method: VoidFunction;
  icon?: ReactNode;
};

export const Actions: TAction[] = [
  {
    title: "Add Card...",
    method: () => {},
  },
  {
    title: "Copy list...",
    method: () => {},
  },
  {
    title: "Move list...",
    method: () => {},
  },
  {
    title: "When a card added to the list...",
    method: () => {},
  },
  {
    title: "Sort list by...",
    method: () => {},
  },
  {
    title: "Move all cards...",
    method: () => {},
  },
  {
    title: "Archive all cards",
    method: () => {},
  },
  {
    title: "Archive list",
    method: () => {},
  },
];
