import React from "react";
import styled from "styled-components";

const MovieCheckOut = styled.div`
  width: 420px;
  padding: 40px 24px;
  border-radius: 12px;
  border: 1px solid #1a2c50;
  button {
    margin-top: 20px;
    width: 100%;
    padding: 16px 12px;
    color: #ffbe00;
    font-size: 20px;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    background-color: #1a2c50;
  }
  .ticket-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    h4 {
      font-size: 24px;
      font-weight: 700;
    }
    .schedule-date {
      font-size: 16px;
      color: #333;
    }
  }
`;

const MovieCheckOutTicket = () => {
  return (
    <MovieCheckOut>
      <div className="ticket-info">
        <h4 className="cinema-name">CGV Aeon</h4>
        <p className="schedule-date">Friday, 12 January, 2024</p>
        <p className="schedule-time">Suất chiếu: 22:00</p>
        <p className="ticket-money">120.000 VND</p>
      </div>
      <button className="btn-checkout">CHECK OUT</button>
    </MovieCheckOut>
  );
};

export default MovieCheckOutTicket;
