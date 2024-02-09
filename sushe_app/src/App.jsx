import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Init from './components/Init'
import Register from './components/Register';
import './App.css'



function App() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Init
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
          />
        }
        />
        <Route path="/register" element={
          <Register
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
          />
        }
        />
      </Routes>
    </>
  )
}

export default App
