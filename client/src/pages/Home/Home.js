import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MovieOverView from "./components/MovieOverView";
import BannerOverview from "./components/BannerOverview";
import MovieNews from "./components/MovieNews";
import MovieRecommend from "./components/MovieRecommend";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

//import slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from "../../App.js";
import Admin from "../../shared/components/Header/Admin/index.js";

//  CSS page
const HomePage = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 85px;
  .movie-slider {
    width: 1300px;
    padding-left: 100px;
  }
  .banner-slider {
    max-width: 1300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .movie-news {
    max-width: 1300px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    &__top {
      width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__intro {
      h4 {
        font-size: 24px;
        font-weight: 700;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #5a637a;
      }
    }
    &__list {
      display: flex;
      gap: 20px;
    }
  }
  .movie-recommend {
    max-width: 1300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 85px;
    &-list {
      width: 1300px;
      display: flex;
      gap: 70px;
    }
  }
  .movie-recommend-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .movie-recommend__intro {
      h4 {
        font-size: 24px;
        font-weight: 700;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #5a637a;
      }
    }
  }
`;

//hàm lấy data từ api
const getMovie = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/getMovie");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getMovieNews = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/news");
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

//component Home
const Home = () => {
  const navigate = useNavigate();
  const [recommendMovie, setRecommendMovie] = useState([]);
  const [allMovie, setAllMovie] = useState([]);
  const [news, setNews] = useState([]);
  const handleFetchData = async () => {
    const movies = await getMovie();
    const rMovie = movies.filter((item) => item.rating === "3");
    const newsList = await getMovieNews();
    if (newsList) {
      setNews(newsList.slice(2, 5));
    }
    setRecommendMovie(rMovie);
    setAllMovie(movies);
  };

  const hanleViewMovieSchedule = (movieId) => {
    navigate(`/schedule/${movieId}`);
  };
  const handleViewNews = (newsId) => {
    navigate(`/news/${newsId}`);
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  // settings cho slider
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <HomePage>
      <Admin />
      {/* Movie Slider */}
      <div className="movie-slider">
        <Slider {...settings}>
          {allMovie.length > 0 &&
            allMovie.map((item, index) => (
              <MovieOverView
                key={`key: ${item._id}`}
                titleMovie={item.name}
                imageMovie={item.image}
                onClickMovie={() => hanleViewMovieSchedule(item._id)}
              ></MovieOverView>
            ))}
        </Slider>
      </div>

      {/* Banner  */}
      <div className="banner-slider">
        <BannerOverview></BannerOverview>
      </div>
      {/* Movie News List */}
      <div className="movie-news">
        <div className="movie-news__top">
          <div className="movie-news__intro">
            <h4>Tin tức phim</h4>
            <p>Cập nhận thông tin về phim hàng ngày</p>
          </div>
          <div className="movie-news__seeMore">
            <Link to={"/news"}>Xem thêm</Link>
          </div>
        </div>
        <div className="movie-news__list">
          {news.length > 0 &&
            news.map((item) => (
              <MovieNews
                tag={item.type}
                image={item.img}
                title={item.title}
                createAt={item.createAt.slice(0, 10)}
                onClick={() => handleViewNews(item._id)}
              ></MovieNews>
            ))}
        </div>
      </div>
      {/* Recommend Movie List */}
      <div className="movie-recommend">
        <div className="movie-recommend-top">
          <div className="movie-recommend__intro">
            <h4>Phim đề cử</h4>
            <p>Đây là danh sách đề cử của chúng tôi</p>
          </div>
          <div className="movie-recommends__seeMore">
            <Link to={"/"}>Xem thêm</Link>
          </div>
        </div>

        <div className="movie-recommend-list">
          {recommendMovie.length > 0 &&
            recommendMovie.map((item, index) => (
              <MovieRecommend
                title={item.name}
                image={item.image}
              ></MovieRecommend>
            ))}
        </div>
      </div>
    </HomePage>
  );
};

export default Home;
