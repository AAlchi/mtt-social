import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Account from './pages/Account';
import Like from './pages/Like';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Index from './pages/Index';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import You from './pages/You';
import Redirect from './components/Redirect';

function App() {


  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/home" element={<Index />}/>
      <Route path="/:username" element={<You />}/>
      <Route path="/like" element={<Like />}/>
      <Route path="/account" element={<Account />}/>
      <Route path="/friends" element={<Friends />}/>
      <Route path="/following" element={<Following />}/>
        <Route path="/followers" element={<Followers />} />
        <Route path="redirect" element={<Redirect />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App