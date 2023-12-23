import { FC, ReactNode } from "react";
import styled from "styled-components";

interface BackDropProps {
  children?: ReactNode;
  zIndex?: number;
}
const DEFAULT_Z_INDEX = 1000;

const BackDrop: FC<BackDropProps> = ({ children, zIndex }) => {
  return <ContainerBackDrop zIndex={zIndex || DEFAULT_Z_INDEX}>{children}</ContainerBackDrop>;
};

export default BackDrop;

const ContainerBackDrop = styled.div<{ zIndex: number }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.09);
  /* -webkit-tap-highlight-color: transparent; */
  z-index: ${(props) => props.zIndex};
`;
