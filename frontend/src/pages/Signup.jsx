import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='signup'>
      <div className="signup_content">
        <h2>Sign Up</h2>
        <h6>Enter The Required Information</h6>
        <input type="text" name="fullName" placeholder='Full Name'/>
        <input type="email" name="email" placeholder='Email'/>
        <input type="text" name="username" placeholder='Username'/>
        <input type="text" name="address" placeholder='Address'/>
        <input type="text" name="zipCode" placeholder='Zipcode'/>
        <input type="password" name="password" placeholder='Password'/>
        <button>Sign Up</button>
        <Link to="/signin">Have An Account? Sign In!</Link>
      </div>
    </div>
  )
}

export default Signup