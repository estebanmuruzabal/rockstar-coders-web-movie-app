import React from 'react'
import Trailer from './Trailer'
import PropTypes from 'prop-types'

const TrailerList = ({ data }) => {
  const trailers = data.map((trailer) => {
    return (
      <Trailer key={trailer.id} trailer={trailer.key} />
    )
  })

  if (trailers.length !== 0) {
    return (
      <div className='trailer-list'>
        <div className='trailer-list__trailers'>{trailers}</div>
      </div>
    )
  } else return null
}

TrailerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }).isRequired)
}

export default TrailerList
