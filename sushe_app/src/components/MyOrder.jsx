import React from 'react'
import sushetext from '../assets/sushe-text.png'

const MyOrder = () => {
  return (
    <div className='relative flex flex-col items-center overflow-hidden bg-sushe-lg'>
        <img className='w-[80px] mt-3 mb-3' src={sushetext} alt="text-logo" />
        <div className='flex justify-center items-center gap-10 mb-3'>
            <p className='font-bold text-xl color-sushe-dg'>Your Orders</p>
            <p className='text-xl color-sushe-dg'>Table Orders</p>
        </div>
        
    </div>
  )
}

export default MyOrder