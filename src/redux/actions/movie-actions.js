import { callApi } from 'helpers/apiUtils';
import { API_KEY, BACKEND_ENDPOINT } from 'configs/environment-variables';
import { FETCH_MOVIES, FETCH_MOVIE_DETAIL, FETCH_CASTS, FETCH_TRAILERS } from 'redux/constants';

export function fetchMovieDetail(id) {
  return callApi(
    `${BACKEND_ENDPOINT}/3/movie/${id}?api_key=${API_KEY}`,
    FETCH_MOVIE_DETAIL,
    'get',
  );
}

export function fetchTrailerList (id) {
  return callApi(
    `${BACKEND_ENDPOINT}/3/movie/${id}/videos?api_key=${API_KEY}`,
    FETCH_TRAILERS,
    'get'
  )
}

export function fetchCastList (id) {
  return callApi(
    `${BACKEND_ENDPOINT}/3/movie/${id}/casts?api_key=${API_KEY}`,
    FETCH_CASTS,
    'get'
  )
}

export function fetchMovies () {
  return callApi(
    `${BACKEND_ENDPOINT}/3/discover/movie?api_key=${API_KEY}`,
    FETCH_MOVIES,
    'get',
  );
}

function shouldFetchMovies(state) {
  // Check cache first
  if (state.moviesReducer.items.length > 0) {
    // Cached, should not fetch
    return false;
  }

  if (state.moviesReducer.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  return true;
}

export function fetchMoviesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState())) {
      return dispatch(fetchMovies());
    }
  };
}