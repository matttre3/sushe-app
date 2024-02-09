import React from 'react'
import sushetext from '../assets/sushe-text.png'
import sushelogo from '../assets/sushe-logo.png'
import blob from '../assets/blob.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Init = ({ userName, setUserName, password, setPassword }) => {

  function setName(e) {
    setUserName(e.target.value)
  }

  function setPsw(e) {
    setPassword(e.target.value)
  }


  function fetchData(e) {
    e.preventDefault();
  
    axios.get('https://sushe-backend-p9to.vercel.app/api/ciola', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Errore nella risposta del server:', error.response.data);
        } else if (error.request) {
          console.error('Nessuna risposta ricevuta dalla richiesta.');
        } else {
          console.error('Errore durante la configurazione della richiesta:', error.message);
        }
      });
  }


  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden'>
        <img className="-mt-[300px] absolute min-w-[700px] md:min-w-[1000px] md:-mt-[700px] spin-image overflow-hidden" src={blob} alt="" />
        <div className="flex-col flex-wrap items-center justify-center flex">
          <img className="mt-[100px] w-[150px]" src={sushelogo} alt="" />
          <img className='w-[150px] -mt-[20px]' src={sushetext} alt="text-logo" />
          <h2 className='mt-[60px] font-medium text-xl color-sushe-dg mb-4'>Accedi ora!</h2>
          <form className='flex-col flex-wrap items-center justify-center flex mb-6' action="">
            <input className="bg-zinc-200 m-1 rounded-xl  p-3 w-[250px] mb-5 input" onChange={setName} type="text" name='userName' id='userName' placeholder='Username' />
            <input className="bg-zinc-200 rounded-xl p-3 w-[250px] mb-5 input" onChange={setPsw} type="password" name='password' id='password' placeholder='Password' />

            <button onClick={fetchData} className='font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 w-[90px]'>Accedi</button>

          </form>
          <Link to="/register"><p className='font-medium text-md color-sushe-dg underline'>Non hai un account? Registrati ora!</p> </Link>
        </div>
      </div>
    </>
  )
}

export default Init