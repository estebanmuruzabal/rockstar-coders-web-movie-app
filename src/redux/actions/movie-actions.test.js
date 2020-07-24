import { fetchMoviesIfNeeded } from 'redux/actions/movie-actions';
import { FETCH_MOVIES } from 'redux/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const setup = () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  return {
    mockStore,
  };
};

const reducers = {
  moviesReducer: {
    isPending: false,
    items: {},
    error: null
  },
};

// mocking the Movie DB api response :)
const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status,
    statusText,
    headers: {
      'Content-type': 'application/json',
    },
  });
};

describe('actions tests', () => {
  it('should create pending, and fullfilled actions for fetching a movie list', () => {
    const { mockStore } = setup();
    const store = mockStore(reducers);

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify({ ok: true, 'meta': null, 'errors': null, 'data': ['movie1'] }))));

    return store.dispatch(fetchMoviesIfNeeded())
      .then(() => {
        // Check that after parsing the body as JSON the success actions were called.
        const calledActions = store.getActions();
        expect(calledActions.length).toBe(2);
        expect(calledActions).toContainEqual({ type: `${FETCH_MOVIES}_PENDING` });
        expect(calledActions).toContainEqual({
          type: `${FETCH_MOVIES}_FULFILLED`,
          payload: { 'ok': true, 'meta': null, 'errors': null, 'data': ['movie1'] }});
      });
  });
}); 