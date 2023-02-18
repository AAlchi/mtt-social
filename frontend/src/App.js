import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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


  


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/home" element={<Index />}/>
      <Route path="/:username" element={<You />}/>
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