import * as React from 'react';
import thunk from 'redux-thunk';
import MovieDetailPage from './MovieDetailPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

const props = {
  movieDetailReducer: {
    isFetching: false,
    items: {}
  },
  match: {
    params: {
      id: 1233
    }
  }
};

describe('MovieDetailPage tests', () => {
  it("Snapshot test", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore(props);

    const component = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <MovieDetailPage {...props} />
        </BrowserRouter>
      </Provider>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
