import React from "react";
import styled from "styled-components";

const MovieRecommendItem = styled.div`
  max-width: 359px;
  .movie-recommend__image {
    width: 359px;
    img {
      display: block;
      max-width: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`;

const MovieRecommend = ({ title, image }) => {
  return (
    <MovieRecommendItem>
      <div className="movie-recommend__image">
        <img srcSet={image} alt="Spiderman Banner" />
      </div>
      <div className="movie-recommend__desc">
        <h4 className="movie-recommend__title">{title}</h4>
        <div className="movie-recommend__tags">
          <span className="movie-recommend__tags-item">XXI</span>
          <span className="movie-recommend__tags-item">CGV</span>
          <span className="movie-recommend__tags_item">CINEMPOLIS</span>
        </div>
      </div>
    </MovieRecommendItem>
  );
};

export default MovieRecommend;
