import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScheduleSlot from "./components/ScheduleSlot";
import MovieTime from "./components/MovieTime";
import MovieCheckOutTicket from "./components/MovieCheckOutTicket";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//css
const ScheduleMovie = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 12px 66px;
  display: flex;
  gap: 50px;
  margin-bottom: 100px;
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
    display: flex;
    gap: 20px;
  }
  .movie-checkout {
  }
`;

const cinemaArr = [
  {
    id: "65a139d8996766de9b1db117",
    name: "Rạp 1",
    price: "100.000 VNĐ",
  },
  {
    id: "65a13a13996766de9b1db119",
    name: "Rạp 2",
    price: "150.000 VNĐ",
  },
  {
    id: "65a13a1f996766de9b1db11b",
    name: "Rạp 3",
    price: "150.000 VNĐ",
  },
  {
    id: "65a13a25996766de9b1db11d",
    name: "Rạp 4",
    price: "150.000 VNĐ",
  },
];

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
  const navigate = useNavigate();
  const param = useParams();
  const [movieById, setMovieById] = useState({});
  const [showTimeByMovieId, setShowTimeByMovieId] = useState([]);
  const [cinemaById, setCinemaById] = useState({});
  const [cinema1, setCinema1] = useState([]);
  const [cinema2, setCinema2] = useState([]);
  const [cinema3, setCinema3] = useState([]);
  const [cinema4, setCinema4] = useState([]);
  const [scheduleChoose, setScheduleChoose] = useState({});
  const [priceMovie, setPriceMovie] = useState("");
  const [isChoose, setIsChoose] = useState(false);
  const handleFetchData = async () => {
    const movie = await getMovieById(param.movieId);
    const showtime = await getShowTimeByMovieId(param.movieId);
    if (showtime) {
      const cine1 = showtime.filter(
        (item) => item.cinemaId === "65a139d8996766de9b1db117"
      );
      const cine2 = showtime.filter(
        (item) => item.cinemaId === "65a13a13996766de9b1db119"
      );
      const cine3 = showtime.filter(
        (item) => item.cinemaId === "65a13a1f996766de9b1db11b"
      );
      const cine4 = showtime.filter(
        (item) => item.cinemaId === "65a13a25996766de9b1db11d"
      );
      setCinema1(cine1);
      setCinema2(cine2);
      setCinema3(cine3);
      setCinema4(cine4);
    }
    setMovieById(movie);
    setShowTimeByMovieId(showtime);
  };
  const handleCheckOut = (movieId, cinemaId, date, schedule) => {
    if (isChoose) {
      navigate("/seats", {
        state: {
          movie: movieId,
          cinema: cinemaId,
          date: date,
          schedule: schedule,
        },
      });
      setIsChoose(false);
    } else {
      alert("Hay chon");
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  console.log("isChoose: ", isChoose);
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
                <p>Rạp 1</p>
              </div>
            )}
          </div>
          <div className="movie-time__list">
            {cinema1.length > 0 &&
              cinema1.map((item, index) => (
                <div
                  onClick={() => {
                    setScheduleChoose(item);
                    const priceCine = cinemaArr.find(
                      (i) => i.id === item.cinemaId
                    );
                    setPriceMovie(priceCine.price);
                    setIsChoose(true);
                    console.log("isChoose: ", isChoose);
                  }}
                >
                  <MovieTime time={item.startAt}></MovieTime>
                </div>
              ))}
          </div>
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">
            {cinemaById && (
              <div className="cinema-name">
                <img src="/images/Star.png" alt="" />
                <p>Rạp 2</p>
              </div>
            )}
          </div>
          <div className="movie-time__list">
            {cinema2.length > 0 &&
              cinema2.map((item, index) => (
                <div
                  onClick={() => {
                    setScheduleChoose(item);
                    console.log("item click: ", item);
                    const priceCine = cinemaArr.find(
                      (i) => i.id === item.cinemaId
                    );
                    setPriceMovie(priceCine.price);
                    setIsChoose(true);
                  }}
                >
                  <MovieTime time={item.startAt}></MovieTime>
                </div>
              ))}
          </div>
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">
            {cinemaById && (
              <div className="cinema-name">
                <img src="/images/Star.png" alt="" />
                <p>Rạp 3</p>
              </div>
            )}
          </div>
          <div className="movie-time__list">
            {cinema3.length > 0 &&
              cinema3.map((item, index) => (
                <div
                  onClick={() => {
                    setScheduleChoose(item);
                    console.log("item click: ", item);
                    const priceCine = cinemaArr.find(
                      (i) => i.id === item.cinemaId
                    );
                    setPriceMovie(priceCine.price);
                    setIsChoose(true);
                  }}
                >
                  <MovieTime time={item.startAt}></MovieTime>
                </div>
              ))}
          </div>
        </div>
        <div className="schedule-cinema">
          <div className="cinema-name">
            {cinemaById && (
              <div className="cinema-name">
                <img src="/images/Star.png" alt="" />
                <p>Rạp 4</p>
              </div>
            )}
          </div>
          <div className="movie-time__list">
            {cinema4.length > 0 &&
              cinema4.map((item, index) => (
                <div
                  onClick={() => {
                    setScheduleChoose(item);
                    console.log("item click: ", item);
                    const priceCine = cinemaArr.find(
                      (i) => i.id === item.cinemaId
                    );
                    setPriceMovie(priceCine.price);
                    setIsChoose(true);
                  }}
                >
                  <MovieTime time={item.startAt}></MovieTime>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="schedule-right">
        <div className="movie-info">
          <img src={movieById.image} alt="" />
          <div className="movie-info-desc">
            <p>Thể loại: {movieById.tag}</p>
            <p>Thời lượng: {movieById.duration}</p>
            <p>Đạo diễn: {movieById.director}</p>
            <p>Đánh giá: {movieById.rating}</p>
          </div>
        </div>
        <div className="movie-checkout">
          <MovieCheckOutTicket
            date={scheduleChoose.startDate?.slice(5, 10)}
            time={scheduleChoose.startAt}
            price={priceMovie}
            onClick={() =>
              handleCheckOut(
                movieById._id,
                scheduleChoose.cinemaId,
                scheduleChoose.startDate,
                scheduleChoose.startAt
              )
            }
          ></MovieCheckOutTicket>
        </div>
      </div>
    </ScheduleMovie>
  );
};

export default Schedule;
