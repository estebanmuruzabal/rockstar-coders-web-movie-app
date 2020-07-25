import React from 'react'
import PropTypes from 'prop-types'

const Trailer = ({ trailer }) => {
  return <iframe
    width='100%'
    height='345'
    title={trailer}
    src={'https://www.youtube.com/embed/' + trailer + '?autoplay=1'}
    frameBorder='0'
    allow='autoplay'
    allowFullScreen />
}

Trailer.propTypes = {
  trailer: PropTypes.string.isRequired
}

export default Trailer