import * as React from 'react';
import { mount } from 'enzyme';
import MovieList from './MovieList';
import renderer from 'react-test-renderer';
import { BrowserRouter, Link } from 'react-router-dom';

const props = {
  movies: [{
    id: 123,
    poster_path: '/movie/124213',
    title: 'matrix',
    vote_average: 213,
    release_date: 'Monday 22',
  }]
};

function render(props) {
  return mount(
    <BrowserRouter>
      <MovieList {...props} />
    </BrowserRouter>
  );
}

describe("MovieList tests", () => {
  it("Snapshot test", () => {

    const component = renderer.create(
      <BrowserRouter>
        <MovieList {...props} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("tests the link to the movie info component", () => {
    const movieIdToTest = '123';
    const wrapper = render(props);
    expect(wrapper.find(Link).props().to).toBe('/movie/' + movieIdToTest);
  });
});
