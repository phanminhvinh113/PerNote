/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FunctionComponent, SetStateAction, createContext, ReactNode, useState } from "react";

export type typeContext = {
  isEditMode: boolean;

  setIsEditMode: Dispatch<SetStateAction<boolean>>;
};
export const EditableContext = createContext<typeContext>({
  isEditMode: false,
  setIsEditMode: (_prevState) => {},
});

interface EditableProps {
  children: ReactNode;
}

const EditableContextContextWrapper: FunctionComponent<EditableProps> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const initialValueContext: typeContext = {
    isEditMode,
    setIsEditMode,
  };

  /**
   * Method For Column
   * */

  return <EditableContext.Provider value={initialValueContext}>{children}</EditableContext.Provider>;
};

export default EditableContextContextWrapper;
