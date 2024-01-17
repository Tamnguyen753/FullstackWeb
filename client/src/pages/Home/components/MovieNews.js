import React from "react";
import styled from "styled-components";

const MovieNewsItem = styled.div`
  max-width: 420px;
  .movie-news__image {
    margin-bottom: 40px;
    img {
      display: block;
      max-width: 100%;
    }
  }
  .movie-news__desc {
    span {
      display: inline-block;
      padding: 8px 12px;
      border: 1px solid black;
      color: black;
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 14px;
    }
    h4 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 18px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #5a637a;
    }
  }
`;

const MovieNews = () => {
  return (
    <MovieNewsItem>
      <img
        srcSet="/images/movie-news-1.png 2x"
        alt=""
        className="movie-news__image"
      />
      <div className="movie-news__desc">
        <span>Spotlight</span>
        <h4>Spider-Man: No Way Home News</h4>
        <p>10 Jan 2024 | MOVIE MINDX</p>
      </div>
    </MovieNewsItem>
  );
};

export default MovieNews;
