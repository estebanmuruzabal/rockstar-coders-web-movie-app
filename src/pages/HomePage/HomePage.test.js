import * as React from 'react';
import HomePage from './HomePage';
import Spinner from 'components/Spinner';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';

const reducerWithFetchingState = {
  moviesReducer: {
    isFetching: true,
    items: []
  }
};

const reducerWithMovies = {
  moviesReducer: {
    isFetching: false,
    items: [{
      id: 123,
      poster_path: '/movie/124213',
      title: 'matrix',
      vote_average: 213,
      release_date: 'Monday 22',
    }, {
      id: 321,
      poster_path: '/movie/321',
      title: 'matrix',
      vote_average: 213,
      release_date: 'Monday 22',
    }]
  }
};

function render(props) {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(props);

  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
}

describe('HomePage tests', () => {
  it("Snapshot test", () => {
    const component = renderer.create(
      render(reducerWithMovies)
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('if loading prop is true, it should show Spinner component', () => {
    const wrapper = render(reducerWithFetchingState);

    expect(wrapper.contains(<Spinner />)).toBe(true)
  });
});
