import { FETCH_MOVIES } from 'redux/constants';
import { moviesReducer } from 'redux/reducers/movie-reducer';
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
});
