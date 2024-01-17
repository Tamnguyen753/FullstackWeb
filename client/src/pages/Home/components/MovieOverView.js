import React from "react";
import styled from "styled-components";

const Movie = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  .movie-image {
    width: 80%;
    img {
      border-radius: 15px;
      cursor: pointer;
    }
  }

  .movie-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .movie-title {
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
  }
  .movie-tags {
    display: flex;
    gap: 18px;
    &_item {
      padding: 6px 8px;
      background-color: #ec1e2b;
      color: white;
      font-size: 12px;
      font-weight: 700;
      border-radius: 4px;
    }
  }
`;

const MovieOverView = ({ titleMovie, imageMovie, onClickMovie }) => {
  return (
    <Movie onClick={onClickMovie}>
      <div className="movie-image">
        <img src={imageMovie} alt="Spiderman Banner" />
      </div>
      <div className="movie-desc">
        <h4 className="movie-title">{titleMovie}</h4>
        <div className="movie-tags">
          <span className="movie-tags_item">XXI</span>
          <span className="movie-tags_item">CGV</span>
          <span className="movie-tags_item">CINEMPOLIS</span>
        </div>
      </div>
    </Movie>
  );
};

export default MovieOverView;
