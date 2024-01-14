import React from "react";
import styled from "styled-components";

const MovieCheckOut = styled.div`
  width: 418px;
  padding: 40px 24px;
`;

const MovieCheckOutTicket = () => {
  return (
    <MovieCheckOut>
      <div className="ticket-info">
        <h4 className="cinema-name">CGV Aeon</h4>
        <p className="schedule-date">Friday, 12 January, 2024</p>
        <p className="schedule-time">22:00</p>
        <p className="ticket-money">120.000 VND</p>
      </div>
      <button className="btn-checkout">Check out</button>
    </MovieCheckOut>
  );
};

export default MovieCheckOutTicket;
