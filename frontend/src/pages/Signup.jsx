import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Header from '../components/Header';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';


function Signup() {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate();
  const userI = JSON.parse(localStorage.getItem('USER'))
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/home';
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
 
  useEffect(() => {
    if (userI) {
      navigate(redirect);
    }
  }, [navigate, redirect, userI]);

   const uploadFiles = (file) => {
     if (!file) return;
      const storageRef = ref(storage, `/profile_image/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

      }, (err) => console.log(err),
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => console.log(url))
      })
  }

 
  const handleSubmit = (e, errors) => {
    e.preventDefault();
    const {fName, lName, email, username, address, zipCode, dob, password} = form;
    if (fName == null || lName == null || email == null || username == null || address == null || zipCode == null || dob == null || password == null || fName === '' || lName === '' || email === '' || username === '' || address === '' || zipCode === '' || dob === '' || password === '') {
      errors = "Empty Inputs";
    } else if (calcAge(dob) < 6 || calcAge(dob) > 100) {
      errors = "Wrong DOB or too young or too old"
    } else {
   
     
      
      errors = "Your All Signed Up!" + progress;
      
      //firebase

      const file = e.target[0].files[0];
      uploadFiles(file)
      let image = `https://firebasestorage.googleapis.com/v0/b/mtt-social-4cf10.appspot.com/o/profile_image%2F${file.name}?alt=media`;

      //mongodb
       const newUser = {
        fName: fName,
        lName: lName,
        email: email,
        username: username,
        address: address,
        zipCode: zipCode,
        dob: dob,
        password: bcrypt.hashSync(password),
        image: image,
      }
      axios.post('/create', newUser).then(res => JSON.stringify(localStorage.setItem('USER_EXISTS', res.data)))


      navigate('/signin')


     }
    document.getElementById('error').innerHTML = errors; 
  }

 

  return (
    <>
    <Header />
    <div className='signup'>
        <form onSubmit={handleSubmit} className="signup_content">
             <h2>Sign Up</h2>
          <h6>Your Profile Picture:</h6>

          <input id="file" type="file" accept="jpg png jpeg gif"/>
     
        <input type="text" name="firstName" onChange={e => setField('fName', e.target.value)}value={form.fName} placeholder='First Name'/>
        <input type="text" name="lastName" onChange={e => setField('lName', e.target.value)}value={form.lName} placeholder='Last Name'/>
        <input type="email" name="email" onChange={e => setField('email', e.target.value)} value={form.email} placeholder='Email'/>
        <input type="text" name="username" onChange={e => setField('username', e.target.value)} value={form.username} placeholder='Username'/>
        <input type="text" name="address" onChange={e => setField('address', e.target.value)} value={form.address} placeholder='Address'/>
        <input type="text" name="zipCode" onChange={e => setField('zipCode', e.target.value)} value={form.zipCode} placeholder='Zipcode'/>
        <input type="date" name="zipCode" onChange={e => setField('dob', e.target.value)} value={form.dob} placeholder='Birthday'/>
        <input type="password" name="password" onChange={e => setField('password', e.target.value)} value={form.password} placeholder='Password'/>

        <span id="error"></span>
        <button type="submit">Sign Up</button>
        <Link to="/signin">Have An Account? Sign In!</Link>
      </form>
    </div>
    </>
  )
}

export default Signup