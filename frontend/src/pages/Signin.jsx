import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';


function Signin() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/home';



  const navigate = useNavigate();

  const userI = JSON.parse(localStorage.getItem('USER'))

  useEffect(() => {
    if (userI) {
      navigate(redirect);
    }
  }, [navigate, redirect, userI]);



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  




  const signinHandler = async (e, errors) => {
    e.preventDefault();
    if (email == null || password == null || email === '' || password === '') {
      errors = "Empty Inputs";
    } else {
      try {
        await Axios.post('/signin', {
          email,
          password
        }).then(res => localStorage.setItem('USER', JSON.stringify(res.data)))
      } catch (err) {
        errors = err;
      }
      
      if (localStorage.getItem('USER') === '' || localStorage.getItem('USER') == null) {
        errors = "Wrong Username Or Password"
      } else {
        navigate('/home')
      }
    }
  document.getElementById('errors').innerHTML = errors;
  }


 
  return (
    <>
              <Header />

    <div className='signin'>

      <form className="signin_content">
        <h2>Sign In</h2>
        <h6>Enter The Required Information</h6>
        <h6>{}
        </h6>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder='Email'/>
        <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} name="password" placeholder='Password'/>
        <span id="errors"></span>
        <button onClick={signinHandler}>Sign In</button>
        <Link to="/signup">Need An Account? Sign Up!</Link>
      </form>
    </div>
    </>

  )
    
}

export default Signin;