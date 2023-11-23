import React from 'react'

function Project(id, name, description, startDate, endDate) {
  return (
    <div>
        <h5>{id}</h5>
        <h5>{name}</h5>
        <h5>{description}</h5>
        <h5>{startDate}</h5>
        <h5>{endDate}</h5>
    </div>
  )
}

export default Project