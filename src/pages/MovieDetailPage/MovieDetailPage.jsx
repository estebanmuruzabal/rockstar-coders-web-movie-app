import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col} from 'react-bootstrap';

import Poster from 'components/Poster';
import MovieInfo from 'components/MovieInfo';
import Spinner from 'components/Spinner';
import { fetchMovieDetail} from 'redux/actions/movie-actions';
import { BACKGROUND_IMG_URL } from 'configs/environment-variables';

class MovieDetailPage extends Component {
  componentDidMount() {
    this.props.fetchMovieDetail(this.props.match.params.id);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchMovieDetail(this.props.match.params.id);
    }
  }


  render() {
    const {
      movie, isFetchingMovie, movieDetailError,
    } = this.props;

    if (isFetchingMovie) {
      return (<Spinner />);
    } else if (movieDetailError) {
      return (<div>There has been an error. Please try again later</div>);
    } else if (movie.hasOwnProperty('id', 'title')) {
      const { title, vote_average, vote_count, release_date, overview, id, poster_path, backdrop_path } = movie;
      const backgroundImage = { backgroundImage: `url(${BACKGROUND_IMG_URL}${backdrop_path})` };
      return(
        <div className="movie-detail-container" style={backgroundImage}>
           <Container className="movie-detail-container__card" fluid={false}>
            <Row>
              <Col className="movie-detail-container__card-poster" sm={12} md={4}>
                <Poster
                  withHoverStyle={false}
                  showInfo={false}
                  title={title}
                  voteAverage={vote_average}
                  releaseDate={release_date}
                  id={id}
                  posterPath={poster_path} />
              </Col>
              <Col className="movie-detail-container__card-info" sm={12} md={8}>
                <MovieInfo title={title}
                  voteAverage={vote_average}
                  voteCount={vote_count}
                  releaseDate={release_date}
                  overview={overview} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else
      return null;
  }
}

const mapStateToProps = state => ({
  isFetchingMovie: state.movieDetailReducer.isFetching,
  movie: state.movieDetailReducer.items,
  movieDetailError: state.movieDetailReducer.error,
});

const mapDispatchToProps = dispatch => ({
  fetchMovieDetail: (movieId) => dispatch(fetchMovieDetail(movieId))
});

MovieDetailPage.propTypes = {
  isFetchingMovie: PropTypes.bool.isRequired,
  movie: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  movieDetailError: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailPage);
