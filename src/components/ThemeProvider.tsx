// src/components/ThemeProvider.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styled, { css } from "styled-components";
import { THEME_MODE } from "../utils/constant.app";
import { AppSliceType } from "../store/features/app/appSlice";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme }: AppSliceType = useSelector((state: RootState) => state.app);
  return (
    <ThemeContainer className={theme} theme={theme}>
      {children}
    </ThemeContainer>
  );
};

export default ThemeProvider;

// Define styled components for light and dark modes
const lightMode = css`
  background-color: #f8f8f8;
  color: #000;
`;

const darkMode = css`
  background-color: #24292e;
  color: #ffffff;
`;
const ThemeContainer = styled.div<{ theme: string }>`
  /* Apply theme mode styles based on the state  */
  ${(props) => {
    switch (props.theme) {
      case THEME_MODE.Light:
        return lightMode;
      default:
        return darkMode;
    }
  }}
`;
