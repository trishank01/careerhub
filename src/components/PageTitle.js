import React from 'react'

const PageTitle = ({title}) => {
  return (
    <div className='uppercase'>
        <h2 className='font-semibold'>{title}</h2>
        <div style={{borderTop: "2px solid black"}} className="mt-2"></div>
    </div>
  )
}

export default PageTitle