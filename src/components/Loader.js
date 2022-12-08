import React from 'react'
import loader from '../assests/icons/loader.svg'

const Loader = () => {
  return (
    <div className='absolute z-10 inset-0 bg-[#b3b3b38a] flex items-center justify-center'>
         <div className='loader'>
            <img src={loader} alt="loader"/>
         </div>
    </div>
  )
}

export default Loader