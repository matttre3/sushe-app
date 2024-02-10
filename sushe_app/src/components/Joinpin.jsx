import React from 'react'
import sushetext from '../assets/sushe-text.png'
import sushelogo from '../assets/sushe-logo.png'
import blob from '../assets/blob.svg'
 
const Joinpin = () => {
  return (
    <>
    <div className='relative flex flex-col items-center overflow-hidden'>
      <img className="-mt-[300px] absolute min-w-[700px] md:min-w-[1000px] md:-mt-[700px] spin-image overflow-hidden" src={blob} alt="" />
      <div className="flex-col flex-wrap items-center justify-center flex">
        <img className="mt-[100px] w-[150px]" src={sushelogo} alt="" />
        <img className='w-[150px] -mt-[20px]' src={sushetext} alt="text-logo" />
      </div>
      <div className='mt-20 flex flex-col justify-center items-center'>
      <input className="bg-zinc-200 rounded-xl p-3 w-[250px] mb-5 input" type="number" name='pin' id='pin' placeholder='PIN' />
      <button className='font-bold text-md color-sushe-dg bg-sushe-lg rounded-xl p-2 w-32'>Accedi</button>
      </div>
    </div>
  </>
  )
}

export default Joinpin