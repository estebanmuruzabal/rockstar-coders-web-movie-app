import { FETCH_MOVIES } from 'redux/constants';

const initialState = {
  items: [],
  isFetching: false,
  error: null
};

function initializeState() {
  return Object.assign({}, initialState);
}

export function moviesReducer(state = initializeState(), action = {}) {
  switch (action.type) {
    case `${FETCH_MOVIES}_PENDING`:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case `${FETCH_MOVIES}_FULFILLED`:
      return Object.assign({}, state, {
        isFetching: false,
        items: moviesListSelector(action.payload.results),
        error: null,
      });
    case `${FETCH_MOVIES}_REJECTED`:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}

const moviesListSelector = (movies) => {
  return movies.filter((movie) => {
    return movie.poster_path != null;
  });
}

// both reducers in a single file only because they are simple and not long
export function movieDetailReducer(state = initializeState(), action = {}) {
  switch (action.type) {
    case `${FETCH_MOVIE_DETAIL}_PENDING`:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case `${FETCH_MOVIE_DETAIL}_FULFILLED`:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        error: null,
      });
    case `${FETCH_MOVIE_DETAIL}_REJECTED`:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}