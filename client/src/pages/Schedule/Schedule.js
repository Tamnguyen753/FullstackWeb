import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScheduleSlot from "./components/ScheduleSlot";
import MovieTime from "./components/MovieTime";
import MovieCheckOutTicket from "./components/MovieCheckOutTicket";
import { useParams } from "react-router-dom";
import axios from "axios";

//css
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

const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/getMovie/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getShowTimeByMovieId = async (movieId) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/showtime/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCinemaById = async (cineId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/cinema/${cineId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Schedule = () => {
  const param = useParams();
  const [movieById, setMovieById] = useState({});
  const [showTimeByMovieId, setShowTimeByMovieId] = useState([]);
  const [cinemaById, setCinemaById] = useState({});
  const handleFetchData = async () => {
    const movie = await getMovieById(param.movieId);
    const showtime = await getShowTimeByMovieId(param.movieId);
    // console.log(`showtime`, showtime, showtime[0].cinemaId);

    if (showtime) {
      console.log("test");
      const cinema = await getCinemaById(showtime[0].cinemaId);
      if (cinema) {
        console.log(`cinema`, cinema);
        setCinemaById(cinema);
      }
    }
    setMovieById(movie);
    setShowTimeByMovieId(showtime);
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  // console.log(showTimeByMovieId);
  // console.log(showTimeByMovieId[0]);
  console.log(cinemaById);

  return (
    <ScheduleMovie>
      <div className="schedule-left">
        <div className="schedule-title">
          <h4>Schedule</h4>
          <p>Schedule update</p>
        </div>
        <div className="schedule-slot">
          {showTimeByMovieId[0] && (
            <ScheduleSlot
              day={showTimeByMovieId[0].startDate}
              datetime={showTimeByMovieId[0].startDate}
            ></ScheduleSlot>
          )}
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">
            {cinemaById && <p>{cinemaById.name}</p>}
            {/* {console.log(`abc`, showTimeByMovieId[0]?.cinemaId)} */}
          </div>
          <div className="movie-time__list">
            {showTimeByMovieId[0] && (
              <MovieTime time={showTimeByMovieId[0].startAt}></MovieTime>
            )}
          </div>
        </div>
      </div>
      <div className="schedule-right">
        <div className="movie-info">
          <img src={movieById.image} alt="" />

          <div className="movie-info-desc">
            <p>Thể loại: {movieById.tag}</p>
            <p>Thời lượng: {movieById.duration}</p>
            <p>Director: {movieById.director}</p>
            <p>Ratting: {movieById.rating}</p>
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
