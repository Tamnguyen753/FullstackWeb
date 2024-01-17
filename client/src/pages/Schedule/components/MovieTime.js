import React from "react";
import styled from "styled-components";

const MovieTimeSlot = styled.button`
  padding: 12px 20px;
  border: 1px solid #9da8be;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #1a2c50;
    color: white;
  }
`;

const MovieTime = ({ time }) => {
  return <MovieTimeSlot>{time}</MovieTimeSlot>;
};

export default MovieTime;
