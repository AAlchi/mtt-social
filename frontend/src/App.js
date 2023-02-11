import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {

const [back, setBack] = useState([{}])

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
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/signup" element={<Signup />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App