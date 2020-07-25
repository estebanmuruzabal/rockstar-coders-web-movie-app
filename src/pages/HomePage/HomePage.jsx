import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchMoviesIfNeeded } from 'redux/actions/movie-actions';
import MovieList from 'components/MovieList';
import Spinner from 'components/Spinner';
import PropTypes from 'prop-types';

function HomePage ({ movies, loading, errors, fetchMoviesIfNeeded }) {
  useEffect(() => {
    if (!movies.length) {
      fetchMoviesIfNeeded()
    }
  }, [movies, loading, errors, fetchMoviesIfNeeded]);

  if (errors) {
    return (
      <div>There has been an error. Please try again later</div>
    )
  } else if (loading) {
    return (
      <Spinner />
    )
  } else if (movies.length) {
    return (
      <div className='homepage-container'>
        <MovieList movies={movies} />
      </div>
    )
  } else return null
}

const mapStateToProps = state => ({
  movies: state.moviesReducer.items,
  loading: state.moviesReducer.isFetching,
  errors: state.moviesReducer.error,
});

const mapDispatchToProps = dispatch => ({
  fetchMoviesIfNeeded: () => dispatch(fetchMoviesIfNeeded()),
});

HomePage.propTypes = {
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);