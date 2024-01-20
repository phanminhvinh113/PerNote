import { Button } from "@mui/material";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

// Define the props for your custom button by extending ButtonHTMLAttributes
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add any additional props specific to your custom button
  children?: ReactNode;
  disable?: boolean;
}

// Create the custom button component
const CustomButton: React.FC<CustomButtonProps> = ({ disable, children, ...props }) => {
  return (
    <ButtonStyle disable={disable || false} {...props}>
      {children}
    </ButtonStyle>
  );
};

export default CustomButton;
const styleButton = styled(Button)``;
export const ButtonStyle = styled.button<{ disable: boolean }>`
  ${styleButton}
  cursor: ${(props) => (props?.disable ? "not-allowed" : "pointer")};
  border-radius: 4px;
  padding: 6px 12px 6px 10px;
  background-color: #494f55;
  color: #b6c2cf;
  font-weight: 500;
  opacity: ${(props) => (props?.disable ? 0.5 : 1)};
  &:hover {
    background-color: #6b6b6b;
  }
`;
