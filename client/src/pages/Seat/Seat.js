import React, { useEffect, useState } from "react";
import SeatComponent from "./components/SeatComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Seats = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 20px;
  .seat-list {
    background-color: lightgray;
    padding: 50px 100px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
  }
  .cinema-name {
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 700;
  }
  .movie-name {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
  }
  .movie-date {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
  }

  .movie-schedule {
    font-size: 24px;
    font-weight: 500;
  }
  .seat-bottom {
    width: 100%;
    height: 60px;
    background-color: #118eea;
  }
  .seat-payment {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
    p {
      font-size: 24px;
      font-weight: 500;
    }
    button {
      width: 300px;
      padding: 20px 80px;
      font-size: 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: #118eea;
        color: white;
      }
    }
  }
`;

//function lấy dữ liệu từ API
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

const getCinemaById = async (cineId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/cinema/${cineId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Seat = () => {
  const param = useParams();

  const [movie, setMovie] = useState({});
  const [cinema, setCinema] = useState({});
  const [seats, setSeats] = useState([]);
  const handleFetchData = async () => {
    const movieData = await getMovieById(param.movieId);
    setMovie(movieData);
    const cinemaData = await getCinemaById(param.cinemaId);
    setCinema(cinemaData);
    if (cinemaData) {
      setSeats(cinemaData.seats);
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <Seats>
      <div className="cinema-name">Tên Rạp: {cinema.name}</div>
      <div className="movie-name">Tên Phim: {movie.name}</div>
      <div className="movie-date">Thời gian: {param.date.slice(5, 10)}</div>
      <div className="movie-schedule">Suất chiếu: {param.schedule}</div>
      <div className="seat-list">
        {seats.length > 0 &&
          seats.map((item, index) => (
            <SeatComponent seatName={item.seatNumber}></SeatComponent>
          ))}
      </div>
      <div className="seat-bottom"></div>
      <div className="seat-payment">
        <p>Ghế chọn: </p>
        <p>Tổng tiền: </p>
        <button>Thanh toán</button>
        <button>Back</button>
      </div>
    </Seats>
  );
};

export default Seat;
