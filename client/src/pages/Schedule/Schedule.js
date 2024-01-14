import React from "react";
import styled from "styled-components";
import ScheduleSlot from "./components/ScheduleSlot";
import MovieTime from "./components/MovieTime";
import MovieCheckOutTicket from "./components/MovieCheckOutTicket";

const ScheduleMovie = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 12px 66px;
  display: flex;
  gap: 50px;
  .schedule-left {
    width: 50%;
  }

  .schedule-right {
    width: 50%;
  }
  .schedule-slot {
    display: flex;
    gap: 24px;
  }
  .movie-info {
  }
`;

const Schedule = () => {
  return (
    <ScheduleMovie>
      <div className="schedule-left">
        <div className="schedule-title">
          <h4>Schedule</h4>
          <p>Schedule update</p>
        </div>
        <div className="schedule-slot">
          <ScheduleSlot></ScheduleSlot>
          <ScheduleSlot></ScheduleSlot>
          <ScheduleSlot></ScheduleSlot>
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">Aeon Ha Dong</div>
          <div className="movie-time__list">
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
          </div>
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">Aeon Ha Dong</div>
          <div className="movie-time__list">
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
          </div>
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">Aeon Ha Dong</div>
          <div className="movie-time__list">
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
            <MovieTime></MovieTime>
          </div>
        </div>
      </div>
      <div className="schedule-right">
        <div className="movie-info">
          <img src="/images/movie-1.png" alt="" />
          <div className="movie-info-desc">
            <p>Gener : Action</p>
            <p>Duration: 2h28p</p>
            <p>Director: Jon Watts</p>
            <p>Ratting: Good</p>
          </div>
        </div>
        <div className="movie-checkout">
          <MovieCheckOutTicket></MovieCheckOutTicket>
        </div>
      </div>
    </ScheduleMovie>
  );
};

export default Schedule;
