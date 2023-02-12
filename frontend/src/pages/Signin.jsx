import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function Signin() {

  const [user, setUser] = useState([{
    fName: '',
    lName: '',
    email: '',
    username: '',
    address: '',
    zipCode: '',
    dob: '',
    password: ''
  }])

  useEffect(() => {
    fetch('/signin').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setUser(jsonRes))
  })

  return (
    <div className='signin'>
      <div className="signin_content">
        <h2>Sign In</h2>
        <h6>Enter The Required Information</h6>
        <h6>{user.map(users => (
          <div>
            {users.password}
          </div>
        ))}</h6>
        <input type="text" name="username" placeholder='Username'/>
        <input type="password" name="password" placeholder='Password'/>
        <button>Sign In</button>
        <Link to="/signup">Need An Account? Sign Up!</Link>
      </div>
    </div>
  )
}

export default Signin;