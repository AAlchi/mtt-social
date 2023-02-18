import React, { useEffect } from 'react'
import './style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faNavicon, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';


export default function Friends() {
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
        navigate(`/${userI.username}`)
    }
  
  
  
  
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('USER')
        navigate('/');
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
        <>

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
           

          Friends



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
    </>
  )
}
