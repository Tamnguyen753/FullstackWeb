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
    cursor: pointer;
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

const MovieCheckOutTicket = ({ cinemaName, date, time, price, onClick }) => {
  return (
    <MovieCheckOut>
      <div className="ticket-info">
        <h4 className="cinema-name">Rạp chiếu: {cinemaName}</h4>
        <p className="schedule-date">Ngày chiếu: {date}</p>
        <p className="schedule-time">Suất chiếu: {time}</p>
        <p className="ticket-money">Giá vé: {price}</p>
      </div>
      <button className="btn-checkout" onClick={onClick}>
        CHECK OUT
      </button>
    </MovieCheckOut>
  );
};

export default MovieCheckOutTicket;
