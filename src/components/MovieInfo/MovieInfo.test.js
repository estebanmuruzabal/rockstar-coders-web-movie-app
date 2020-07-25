import * as React from 'react';
import MovieInfo from './MovieInfo';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const props = {
  title: 'matrix',
  voteAverage: 22,
  id: 53421,
  voteCount: 44,
  releaseDate: 'Monday 5 Feb',
  overview: 'a great movie',
  trailers: [{ id: '213123', key: '213123' }]
};

function render(props) {
  return mount(
    <MovieInfo {...props} />
  );
}

describe("MovieInfo tests", () => {
  it("Snapshot test", () => {
    const component = renderer.create(
      <MovieInfo {...props} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders the correct props", () => {
    const wrapper = render(props);
    const titleItem = wrapper.find(".movie-info-container__title").first();
    expect(titleItem.text()).toBe("matrix");

    const overviewItem = wrapper.find("p");
    expect(overviewItem.text()).toBe("a great movie");

    const averageItem = wrapper.find(".movie-info-container__subtitle").at(1);
    expect(averageItem.text()).toBe("Vote average: 22");

    const countItem = wrapper.find(".movie-info-container__subtitle").at(2);
    expect(countItem.text()).toBe("Vote count: 44");

    const releaseItem = wrapper.find(".movie-info-container__subtitle").at(3);
    expect(releaseItem.text()).toBe("Original Release: Mond");
  });
});
