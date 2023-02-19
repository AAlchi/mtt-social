import React, { useEffect, useState } from 'react'
import './style.css';
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
  
    const like = () => {
        navigate('/like')
    }
  
    const following = () => {
        navigate('/following')
    }
  
    const followers = () => {
        navigate('/followers')
    }
  
    const you = () => {
        navigate(`/${userI.username}`)
    }

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [image, setImage] = useState('');

  

    function done(e) {
      e.preventDefault()
      const display = document.querySelector(".display");
        const input = document.querySelector("#upload");
        
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
        await Axios.post('/updateUser', {
          id: userI._id,
          fname,
          lname,
          email,
          username,
          address,
          zipcode,
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

        if (side.style.display === "flex") {
            side.style.display = "none";
        } else {
            side.style.display = "flex";
        }
  }
  
     var width  = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;

    const phone = () => {
        let phone = document.getElementById('sidebar');

        if (phone.style.display === "flex") {
            phone.style.display = "none";
        } else {
            phone.style.display = "flex";
        }
    }
    return (
        <div className='account'>
<div className="title">
            <center><h1>MTT SOCIAL</h1></center>
        </div>
         <div onClick={phone} className="phone">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        <div className='index'>
          
          {width < 700 ? (
                       <div id="sidebar" className="sideBar">
            <ul>
                <h2>Options</h2>
                <li onClick={home}>Home</li>
                <li onClick={you}>Your Page</li>
                <li onClick={like}>Liked Posts</li>
                <li onClick={account}>Account</li>
                <li onClick={friends}>Freinds</li>
                <li onClick={following}>Following</li>
                <li onClick={followers}>Followers</li>
                <li onClick={logout}>Log Out</li>
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

            ) : (
                <div></div>       
            )} 
      
     
           

            <form onSubmit={updateProfile} className="account_main">
            <h2>Comming Soon</h2>
            </form>
            
            



          
          {width > 700 ? (
                       <div id="sidebar" className="sideBar">
            <ul>
                <h2>Options</h2>
                <li onClick={home}>Home</li>
                <li onClick={you}>Your Page</li>
                <li onClick={like}>Liked Posts</li>
                <li onClick={account}>Account</li>
                <li onClick={friends}>Freinds</li>
                <li onClick={following}>Following</li>
                <li onClick={followers}>Followers</li>
                <li onClick={logout}>Log Out</li>
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

            ) : (
                <div></div>       
            )} 
       
    </div>
    </div>
  )
}
