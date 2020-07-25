import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MovieInfo = ({
  title, voteAverage, voteCount, releaseDate, overview
}) => {
  return(
    <div className="movie-info-container">
      <Row className="movie-info-container__overview">
        <div className="movie-info-container__title">{title}</div>
        <div className="movie-info-container__subtitle">Overview</div>
        <p>
          {overview}
        </p>
      </Row>
      <Row className="movie-info-container__averages">
          <div className="movie-info-container__subtitle">
            Vote average: {voteAverage}
          </div>
          <div className="movie-info-container__subtitle">
            Vote count: {voteCount}
          </div>
          <div className="movie-info-container__subtitle">
            Original Release: {releaseDate.substring(0,4)}
          </div>
      </Row>
    </div>
  );
}

MovieInfo.propTypes = {
  title: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  voteCount: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default MovieInfo;
