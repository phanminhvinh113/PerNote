import { BoardContext } from "@/context/BoardContext";
import { useContext } from "react";

const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("Context Not Provider");
  }
  return context;
};

export default useBoardContext;
