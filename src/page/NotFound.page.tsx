import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../utils/constant.path";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  color: #ff4081;
  margin-bottom: 20px;
`;

const NotFoundText = styled.p`
  font-size: 1.5rem;
  color: #333;
`;

const NotFoundLink = styled.div`
  text-decoration: none;
  color: #ff4081;
  font-weight: bold;
  margin-top: 20px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #ff4081;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Oops! This page doesn't exist.</NotFoundText>
      <NotFoundLink>
        <Link to={PATH.home}>Go back to the homepage</Link>
      </NotFoundLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
