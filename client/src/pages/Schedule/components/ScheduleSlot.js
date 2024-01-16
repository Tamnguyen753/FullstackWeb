import React from "react";
import styled from "styled-components";

const Slot = styled.div`
  max-width: 86px;
  padding: 18px;
  border: 1px solid #5a637a;
  border-radius: 8px;
  .slot-date {
    span {
      font-size: 14px;
      font-weight: 500;
      color: #5a637a;
    }
  }
  .slot-day {
    font-size: 18px;
    font-weight: 800;
    text-align: center;
  }
`;

const ScheduleSlot = ({ day, datetime }) => {
  return (
    <Slot>
      <div className="slot-date">
        <span>{datetime}</span>
      </div>
      <div className="slot-day">
        <span>{day}</span>
      </div>
    </Slot>
  );
};

export default ScheduleSlot;
