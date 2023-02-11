import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <div className="home_welcome">
        <center>Welcome To MTT Media</center>
        <Link className="home_signin_button" to="/signin">Sign In</Link>
      </div>
    </div>
  )
}

export default Home