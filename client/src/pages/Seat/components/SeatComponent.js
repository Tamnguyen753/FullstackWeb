import React from "react";
import styled from "styled-components";

const SeatItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333333;
  width: 80px;
  height: 72px;
  border-radius: 6px;
  p {
    font-size: 12px;
    font-weight: 700;
  }
  cursor: pointer;
  &:hover {
    background-color: #1a2c50;
    color: white;
  }
`;

const SeatComponent = ({ seatName }) => {
  return (
    <SeatItem>
      <p>{seatName}</p>
    </SeatItem>
  );
};

export default SeatComponent;
