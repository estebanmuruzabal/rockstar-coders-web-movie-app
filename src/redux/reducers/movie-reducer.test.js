import { FETCH_MOVIES, FETCH_MOVIE_DETAIL } from 'redux/constants';
import { moviesReducer, movieDetailReducer } from 'redux/reducers/movie-reducer';
import expect from 'expect';

describe('movie reducer tests', () => {
  const initialState = {
    items: [],
    isFetching: false,
    error: null
  };
  it('should return the initial state', () => {
    expect(moviesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_MOVIES_PENDING', () => {
    const pendingAction = { type: `${FETCH_MOVIES}_PENDING` };

    expect(moviesReducer({}, pendingAction)).toEqual({
      isFetching: true,
    });
  });

  it('should handle FETCH_MOVIES_FULFILLED', () => {
    const fullfilledAction = {
      type: `${FETCH_MOVIES}_FULFILLED`,
      payload: {results: [] }
    };

    expect(moviesReducer({}, fullfilledAction)).toEqual({
      isFetching: false,
      items: fullfilledAction.payload.results,
      error: null
    });
  });

  it('should handle FETCH_MOVIES_REJECTED', () => {
    const rejectedAction = {
      type: `${FETCH_MOVIES}_REJECTED`,
      error: {}
    };

    expect(moviesReducer({}, rejectedAction)).toEqual({
      isFetching: false,
      error: rejectedAction.error,
    });
  });

  it('should handle FETCH_MOVIE_DETAIL_PENDING', () => {
    const pendingAction = { type: `${FETCH_MOVIE_DETAIL}_PENDING` };

    expect(movieDetailReducer({}, pendingAction)).toEqual({
      isFetching: true,
    });
  });

  it('should handle FETCH_MOVIE_DETAIL_FULFILLED', () => {
    const fullfilledAction = {
      type: `${FETCH_MOVIE_DETAIL}_FULFILLED`,
      payload: { ok: true, results: {} }
    };

    expect(movieDetailReducer({}, fullfilledAction)).toEqual({
      isFetching: false,
      items: fullfilledAction.payload,
      error: null
    });
  });

  it('should handle FETCH_MOVIE_DETAIL_REJECTED', () => {
    const rejectedAction = {
      type: `${FETCH_MOVIE_DETAIL}_REJECTED`,
      error: {},
    };

    expect(movieDetailReducer({}, rejectedAction)).toEqual({
      isFetching: false,
      error: rejectedAction.error,
    });
  });
});
