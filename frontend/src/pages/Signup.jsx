import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Header from '../components/Header';

function Signup() {
  const [form, setForm] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]:value
    })
  }
  const calcAge = (dateString) => {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age;
  }
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

 
  const handleSubmit = (e, errors) => {
    e.preventDefault();
    const {fName, lName, email, username, address, zipCode, dob, password} = form;
    if (fName == null || lName == null || email == null || username == null || address == null || zipCode == null || dob == null || password == null || fName === '' || lName === '' || email === '' || username === '' || address === '' || zipCode === '' || dob === '' || password === '') {
      errors = "Empty Inputs";
    } else if (calcAge(dob) < 6 || calcAge(dob) > 100) {
      errors = "Wrong DOB or too young or too old"
    } else {
      const newUser = {
        fName: fName,
        lName: lName,
        email: email,
        username: username,
        address: address,
        zipCode: zipCode,
        dob: dob,
        password: bcrypt.hashSync(password),
      }
      axios.post('http://localhost:5000/create', newUser)
      errors = "You are all signed up "+username+"!"
     }
    document.getElementById('error').innerHTML = errors
  }
  return (
    <>
              <Header />

    <div className='signup'>

      <form className="signup_content">
        <h2>Sign Up</h2>
        <h6>Enter The Required Information</h6>
        <input type="text" name="firstName" onChange={e => setField('fName', e.target.value)}value={form.fName} placeholder='First Name'/>
        <input type="text" name="lastName" onChange={e => setField('lName', e.target.value)}value={form.lName} placeholder='Last Name'/>
        <input type="email" name="email" onChange={e => setField('email', e.target.value)} value={form.email} placeholder='Email'/>
        <input type="text" name="username" onChange={e => setField('username', e.target.value)} value={form.username} placeholder='Username'/>
        <input type="text" name="address" onChange={e => setField('address', e.target.value)} value={form.address} placeholder='Address'/>
        <input type="text" name="zipCode" onChange={e => setField('zipCode', e.target.value)} value={form.zipCode} placeholder='Zipcode'/>
        <input type="date" name="zipCode" onChange={e => setField('dob', e.target.value)} value={form.dob} placeholder='Birthday'/>
        <input type="password" name="password" onChange={e => setField('password', e.target.value)} value={form.password} placeholder='Password'/>
        <span id="error"></span>
        <button onClick={handleSubmit}>Sign Up</button>
        <Link to="/signin">Have An Account? Sign In!</Link>
      </form>
    </div>
    </>
  )
}

export default Signup