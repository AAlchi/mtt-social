import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Account from './pages/Account';
import Feed from './pages/Feed';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Index from './pages/Index';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import You from './pages/You';

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
      <Route path="/you" element={<You />}/>
      <Route path="/feed" element={<Feed />}/>
      <Route path="/account" element={<Account />}/>
      <Route path="/friends" element={<Friends />}/>
      <Route path="/following" element={<Following />}/>
      <Route path="/followers" element={<Followers />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App