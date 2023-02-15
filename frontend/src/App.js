import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Index from './pages/Index';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {

const [back, setBack] = useState([{}])
const userI = localStorage.getItem('USER')

useEffect(() => {
  fetch("/api").then (
    response => response.json()
  ).then (
    data => {
      setBack(data)
    }
  )
}, [])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/home" element={<Index />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App