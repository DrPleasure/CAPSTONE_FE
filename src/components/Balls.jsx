import React from 'react'

const Balls = ({ x, y, image }) => {
  const style = {
    position: 'absolute',
    left: x + 'px',
    top: y + 'px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
  }

  return <div style={style} />
}

export default Balls
