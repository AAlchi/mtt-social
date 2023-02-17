import React, { useEffect, useState } from 'react'
import './style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faNavicon, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function Account() {
    const userI = JSON.parse(localStorage.getItem('USER'))
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const home = () => {
        navigate('/');
    }

    const friends = () => {
        navigate('/friends')
    }
  
    const account = () => {
        navigate('/account')
    }
  
    const feed = () => {
        navigate('/feed')
    }
  
    const following = () => {
        navigate('/following')
    }
  
    const followers = () => {
        navigate('/followers')
    }
  
    const you = () => {
        navigate('/you')
    }

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [dob, setDob] = useState('');
    const [image, setImage] = useState('');

  

    function done(e) {
      e.preventDefault()
      const display = document.querySelector(".display");
        const input = document.querySelector("#upload");
        let img = document.querySelector("img");
        
          let reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          reader.addEventListener("load", () => {
            console.log(reader.result)
            display.innerHTML = `<img src=${reader.result} alt=''/>`;
            setImage(reader.result)

          });
          
    
    }
 
  
  
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('USER')
        navigate('/');
    }
    let errors = ""

    const updateProfile = async (e) => {
      e.preventDefault()

      try {
        await Axios.post('http://localhost:5000/updateuser', {
          id: userI._id,
          fname,
          lname,
          email,
          username,
          address,
          zipcode,
          dob,
          image
        })
        errors = "Log Out For Update To Apply"
      } catch (err) {
        console.log(err)
        errors = "Something went wrong. Please try again later."
      }
    }

    
  
    useEffect(() => {
      if (userI == null) {
        navigate(redirect);
      }
    }, [navigate, redirect, userI]);
  
    
    const phoneThing = () => {
        const side = document.getElementById('sidebar');

        if (side.style.display == "flex") {
            side.style.display = "none";
        } else {
            side.style.display = "flex";
        }
    }
    return (
        <div className='account'>

<div className="title">
            <center><h1>MTT SOCIAL</h1></center>
        </div>
    <div className='index'>
      
        <div onClick={phoneThing} className="phone_thing">
        <div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div>
        <div id="sidebar" className="sideBar">
            <ul>
                <h2>Options</h2>
                <li onClick={home}>Home</li>
                <li onClick={you}>Your Page</li>
                <li onClick={feed}>Feed</li>
                <li onClick={account}>Account</li>
                <li onClick={friends}>Freinds</li>
                <li onClick={following}>Following</li>
                <li onClick={followers}>Followers</li>
                <li onClick={logout}>Log Out</li>
            </ul>
        </div>
        <div>
           

          <form className="account_main">
            <h2>Your Account</h2>
            <div className='profile_picture'>
              <h6>Profile Picture:</h6>
              <div class="display"><img src={userI.image} alt="" /></div>
              <button onClick={done}>Upload Picture</button>

            </div>
            <div className='thi'>
              <input type="file" accept="image/*" id="upload"/>
              <label for="upload"> </label>

            </div>
              <div>
              <h6>First Name:</h6>
              <input type="text" onChange={(e) => setFname(e.target.value)} value={userI.fName}/>
              </div>
              <div>
              <h6>Last Name:</h6>
              <input type="text" onChange={(e) => setLname(e.target.value)} value={userI.lName}/>
              </div>
              <div>
              <h6>Email:</h6>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={userI.email}/>
              </div>
              <div>
              <h6>Username:</h6>
              <input type="text" onChange={(e) => setUsername(e.target.value)} value={userI.username}/>
              </div>
              <div>
              <h6>Address:</h6>
              <input type="text" onChange={(e) => setAddress(e.target.value)} value={userI.address}/>
              </div>
              <div>
              <h6>Zip Code:</h6>
              <input type="text" onChange={(e) => setZipcode(e.target.value)} value={userI.zipCode}/>
              </div>
              <div>
              <h6>Date Of Birth:</h6>
              <input type="text" onChange={(e) => setDob(e.target.value)} value={userI.dob}/>
              </div>
              <span>{errors}</span>
              <button onClick={updateProfile}>Update Profile</button>
          </form>



        </div>
        <div className="rightBar">
            <ul>
                <h2>Friends</h2>
                <li>Joe Biden</li>
                <li>Camala Harris</li>
                <li>Jeff Bezos</li>
                <li>Elon Musk</li>
                <li>Bill Gates</li>
                <li>Ali Ibrahim</li>
                <li>ARKS101</li>
                <li>Joe Biden</li>
                <li>Camala Harris</li>
                <li>Jeff Bezos</li>
                <li>Elon Musk</li>
                <li>Bill Gates</li>
                <li>Ali Ibrahim</li>
                <li>ARKS101</li>
            </ul>
        </div>
    </div>
    </div>
  )
}
