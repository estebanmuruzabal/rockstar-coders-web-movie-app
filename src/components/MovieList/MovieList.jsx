import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col} from 'react-bootstrap';
import Poster from 'components/Poster';

const MovieList = ({
  movies
}) => {
  const moviesFiltered = movies.length && movies.map((movie) => {
      return(
        <Col sm={12} md={6} lg={4} key={movie.id}>
          <Link to={'/movie/' + movie.id} >
            <Poster
              withHoverStyle
              showInfo
              id={movie.id}
              posterPath={movie.poster_path} 
              title={movie.title} 
              voteAverage={movie.vote_average}
              releaseDate={movie.release_date} />
            </Link>
        </Col>
      );
  });
  return (
    <Container fluid={false}>
      <Row className="movie-list-container">
        {moviesFiltered.length > 0 ? moviesFiltered : null}
      </Row>
    </Container>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
  }).isRequired),
};

export default MovieList;
