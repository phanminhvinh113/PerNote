import { FC } from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
  fontTitle?: number;
  position?: "left" | "center" | "right";
  backgroundColor?: string;
  color?: string;
}

const Header: FC<HeaderProps> = ({ title, fontTitle, position = "center", backgroundColor, color }) => {
  return (
    <Container $position={position} backgroundColor={backgroundColor} color={color}>
      <Title fontTitle={fontTitle || 1}>{title}</Title>
    </Container>
  );
};

export default Header;

interface ContainerProps {
  $position: "left" | "center" | "right";
  backgroundColor?: string;
  color?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  text-align: center;
  align-items: center;
  position: relative;
  color: ${(props) => props.color || "#9fadbc"};
  background-color: ${(props) => props.backgroundColor || "transparent"};

  ${(props) =>
    props.$position === "left" &&
    `
    justify-content: flex-start;
  `}

  ${(props) =>
    props.$position === "center" &&
    `
    justify-content: center;
  `}

  ${(props) =>
    props.$position === "right" &&
    `
    justify-content: flex-end;
  `}
`;

const Title = styled.span<{ fontTitle: number }>`
  display: block;
  font-size: ${(props) => props.fontTitle}em;
  font-weight: 600;
  grid-column: 1 / span 3;
  grid-row: 1;
  height: 40px;
  letter-spacing: -0.003em;
  line-height: 40px;
  margin: 0;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
`;
