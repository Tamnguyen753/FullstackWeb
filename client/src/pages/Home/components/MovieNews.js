import React from "react";
import styled from "styled-components";

const MovieNewsItem = styled.div`
  max-width: 420px;
  .movie-news__image {
    margin-bottom: 40px;
    img {
      display: block;
      max-width: 100%;
      height: 50%;
      object-fit: cover;
      cursor: pointer;
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
      cursor: pointer;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #5a637a;
    }
  }
`;

const MovieNews = ({ tag, image, createAt, title, onClick }) => {
  return (
    <MovieNewsItem>
      <img src={image} alt="" className="movie-news__image" onClick={onClick} />
      <div className="movie-news__desc">
        <span>{tag}</span>
        <h4 onClick={onClick}>{title}</h4>
        <p>{createAt}</p>
      </div>
    </MovieNewsItem>
  );
};

export default MovieNews;
