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
    margin-top: 20px;
  }
  .movie-info {
    img {
      width: 425px;
      margin-bottom: 30px;
      border-radius: 10px;
    }
  }
  .movie-info-desc {
    p {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
      color: #333333;
    }
  }

  .schedule-title {
    h4 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #5a637a;
    }
  }
  .schedule-cinema {
    margin-top: 30px;
  }
  .cinema-name {
    display: flex;
    align-items: center;
    gap: 16px;
    p {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .movie-time__list {
    margin-top: 20px;
  }
  .movie-checkout {
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

const getShowTime = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/showtime");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const Schedule = () => {
  const param = useParams();
  const [movieById, setMovieById] = useState({});
  const [showTimeByMovieId, setShowTimeByMovieId] = useState([]);
  const [cinemaById, setCinemaById] = useState({});
  const [showTimeOfMovie, setShowTimeOfMovie] = useState([]);
  const handleFetchData = async () => {
    const movie = await getMovieById(param.movieId);
    const showtime = await getShowTimeByMovieId(param.movieId);
    const all_showtime = await getShowTime();
    if (showtime) {
      const cinema = await getCinemaById(showtime[0].cinemaId);
      if (cinema) {
        setCinemaById(cinema);
      }
    }
    if (all_showtime) {
      const filterShowtime = all_showtime.filter(
        (item) => item.movieId === param.movieId
      );
      setShowTimeOfMovie(filterShowtime);
      // console.log("Filter showtime: ", filterShowtime);
    }
    // console.log("showtime: ", all_showtime, typeof all_showtime);

    setMovieById(movie);
    setShowTimeByMovieId(showtime);
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  console.log(showTimeOfMovie);
  return (
    <ScheduleMovie>
      <div className="schedule-left">
        <div className="schedule-title">
          <h4>Lịch Chiếu</h4>
          <p>Cập nhật lịch chiếu</p>
        </div>
        <div className="schedule-slot">
          {showTimeByMovieId[0] && (
            <ScheduleSlot
              day={showTimeByMovieId[0].startDate}
              datetime={showTimeByMovieId[0].startDate.slice(5, 10)}
            ></ScheduleSlot>
          )}
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">
            {cinemaById && (
              <div className="cinema-name">
                <img src="/images/Star.png" alt="" />
                <p>{cinemaById.name}</p>
              </div>
            )}
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
