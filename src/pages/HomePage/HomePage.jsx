import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchMoviesIfNeeded } from 'redux/actions/movie-actions';
import MovieList from 'components/MovieList';
import SearchBox from 'components/SearchBox';
import StarRating from 'components/StarRating';
import Spinner from 'components/Spinner';
import PropTypes from 'prop-types';

function HomePage ({ movies, loading, errors, fetchMoviesIfNeeded }) {
  const [moviesFetched, setMovies] = useState([]);

  useEffect(() => {
    if (!movies.length) {
      fetchMoviesIfNeeded()
    } else {
      setMovies(movies);
    }
  }, [movies, loading, errors, fetchMoviesIfNeeded]);

  const handleSearchInputChanges = (searchValue) => {
    const moviesFiltered = movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()));
    setMovies(moviesFiltered);
  }

  const filterRatingCondition = (movie, value) => {
    // we multiply by 2 because our star component goes from 1 to 5 and the movies rating are from 1 to 10
    const ratingValue = value * 2;
    const average = Number(movie.vote_average.toFixed(0));
    // we return the current movie ratingValue or two stars less :)
    return average === ratingValue || average === (ratingValue - 1) || average === (ratingValue - 2);
  };

  const setRatingFilter = (ratingValue) => {
    const moviesFiltered = movies.filter(movie => filterRatingCondition(movie, ratingValue));
    setMovies(moviesFiltered);
  }

  if (errors) {
    return (
      <div>There has been an error. Please try again later</div>
    )
  } else if (loading) {
    return (
      <Spinner />
    )
  } else {
    return (
      <div className='homepage-container'>
        <SearchBox handleSearchInputChanges={handleSearchInputChanges} />
        <StarRating setRatingFilter={setRatingFilter} />
        <MovieList movies={moviesFetched} />
      </div>
    )
  }
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