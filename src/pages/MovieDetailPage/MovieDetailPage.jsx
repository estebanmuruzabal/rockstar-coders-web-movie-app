import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

import Poster from 'components/Poster'
import MovieInfo from 'components/MovieInfo'
import Spinner from 'components/Spinner'
import { fetchMovieDetail, fetchTrailerList } from 'redux/actions/movie-actions'
import { BACKGROUND_IMG_URL } from 'configs/environment-variables'

function MovieDetailPage ({ movie, trailers, isLoading, errors, fetchMovieDetail, fetchTrailerList, ...props }) {
  useEffect(() => {
    if (!movie.id || (movie.id && props.match.params.id && String(movie.id) !== String(props.match.params.id) && isLoading !== true)) {
      fetchMovieDetail(props.match.params.id)
      fetchTrailerList(props.match.params.id)
    }
    window.scrollTo(0, 0)
  }, [movie, isLoading, errors, fetchMovieDetail, fetchTrailerList, props])

  if (isLoading) {
    return (<Spinner />)
  } else if (errors) {
    return (<div>There has been an error. Please try again later</div>)
  } else if (movie.hasOwnProperty('id', 'title')) {
    const {
      title,
      vote_average: voteAverage,
      vote_count: voteCount,
      release_date: releaseDate,
      overview,
      id,
      poster_path: posterPath,
      backdrop_path: backdropPath
    } = movie
    const backgroundImage = { backgroundImage: `url(${BACKGROUND_IMG_URL}${backdropPath})` }
    return (
      <div className='movie-detail-container' style={backgroundImage}>
        <Container className='movie-detail-container__card' fluid={false}>
          <Row>
            <Col className='movie-detail-container__card-poster' sm={12} md={4}>
              <Poster
                withHoverStyle={false}
                showInfo={false}
                title={title}
                voteAverage={voteAverage}
                releaseDate={releaseDate}
                id={id}
                posterPath={posterPath} />
            </Col>
            <Col className='movie-detail-container__card-info' sm={12} md={8}>
              <MovieInfo title={title}
                voteAverage={voteAverage}
                trailers={trailers}
                voteCount={voteCount}
                releaseDate={releaseDate}
                overview={overview} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else return null
}

const mapStateToProps = state => ({
  movie: state.movieDetailReducer.items,
  trailers: state.trailersReducer.items,
  errors:
    state.trailersReducer.error ||
    state.movieDetailReducer.error,
  isLoading:
    state.trailersReducer.isFetching ||
    state.movieDetailReducer.isFetching
})

const mapDispatchToProps = dispatch => ({
  fetchMovieDetail: (movieId) => dispatch(fetchMovieDetail(movieId)),
  fetchTrailerList: (movieId) => dispatch(fetchTrailerList(movieId))
})

MovieDetailPage.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]),
  errors: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  trailers: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailPage)
