import { callApi } from 'helpers/apiUtils';
import { API_KEY, BACKEND_ENDPOINT } from 'configs/environment-variables';
import { FETCH_MOVIES } from 'redux/constants';

export function fetchMovies() {
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