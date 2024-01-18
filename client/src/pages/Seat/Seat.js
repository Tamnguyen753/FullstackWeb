import React, { useEffect, useState } from "react";
import SeatComponent from "./components/SeatComponent";
import { useNavigate, useParams } from "react-router-dom";
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
  let number = 0;
  const param = useParams();
  const navigate = useNavigate();
  const [numberSeatChoose, setNumberSeatChoose] = useState(0);
  const [movie, setMovie] = useState({});
  const [cinema, setCinema] = useState({});
  const [seats, setSeats] = useState([]);
  const [seatChoose, setSeatChoose] = useState([]);
  const handleFetchData = async () => {
    const movieData = await getMovieById(param.movieId);
    setMovie(movieData);
    const cinemaData = await getCinemaById(param.cinemaId);
    setCinema(cinemaData);
    if (cinemaData) {
      setSeats(cinemaData.seats);
    }
  };
  const handleChooseSeat = (seat) => {
    setSeatChoose([...seatChoose, { id: number++, seat: seat }]);
    console.log(number);
    setNumberSeatChoose(numberSeatChoose + 1);
  };
  const handlePayment = () => {
    navigate("/payment", { state: { seat: seatChoose } });
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  console.log(numberSeatChoose);
  return (
    <Seats>
      <div className="cinema-name">Tên Rạp: {cinema.name}</div>
      <div className="movie-name">Tên Phim: {movie.name}</div>
      <div className="movie-date">Thời gian: {param.date.slice(5, 10)}</div>
      <div className="movie-schedule">Suất chiếu: {param.schedule}</div>
      <div className="seat-list">
        {seats.length > 0 &&
          seats.map((item, index) => (
            <SeatComponent
              seatName={item.seatNumber}
              onClick={() => handleChooseSeat(item.seatNumber)}
            ></SeatComponent>
          ))}
      </div>
      <div className="seat-bottom"></div>
      <div className="seat-payment">
        <p>Ghế chọn: {seatChoose.map((seat) => seat.seat + ",")}</p>
        <p>Tổng tiền: {150000 * numberSeatChoose}</p>
        <button onClick={() => handlePayment()}>Thanh toán</button>
        <button>Back</button>
      </div>
    </Seats>
  );
};

export default Seat;
