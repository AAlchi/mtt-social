import React from 'react'
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <div className='signin'>
      <div className="signin_content">
        <h2>Sign In</h2>
        <h6>Enter The Required Information</h6>
        <input type="text" name="username" placeholder='Username'/>
        <input type="password" name="password" placeholder='Password'/>
        <button>Sign In</button>
        <Link to="/signup">Need An Account? Sign Up!</Link>
      </div>
    </div>
  )
}

export default Signin;