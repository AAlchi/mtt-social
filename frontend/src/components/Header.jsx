import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header() {
  
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');



  const navigate = useNavigate();

  const userI = JSON.parse(localStorage.getItem('USER'))

  let signin = "/signin";
  let signup = "/signup";
  let SIGN1 = "Sign In";
  let SIGN2 = "Sign Up";
    if (userI) {
      signin = "/account";
      signup = "/logout";
      SIGN1 = "Account";
      SIGN2 = "Log Out";
    }

 const logout = () => {
  if (signup == "/logout") {
    localStorage.removeItem('USER');
  }
  let phone = document.getElementById('header_phone_icons');

  phone.style.display = "none";

 }

 const phoneDone = () => {
  let phone = document.getElementById('header_phone_icons');

  phone.style.display = "none";

 }
  const HeaderPhone = () => {
    let phone = document.getElementById('header_phone_icons');
    let block = document.getElementById('block');

    

    if (phone.style.display == "flex") {
      phone.style.display = "none";
      block.style.display = "block";
    } else {
      phone.style.display = "flex";
      block.style.display = "none";
    }
  }
  return (
    <div>
    <div className='header'>
        <Link className="header_title" to="/">MTT MEDIA</Link>
        <div onClick={HeaderPhone} className='header_phone'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="header_icons">
            <Link className="header_icon" to={signin}>{SIGN1}</Link>
            <Link onClick={logout} className="header_icon" to={signup == "/logout" ? "" : "/signup"}>{SIGN2}</Link>
        </div>
    </div>
        <div className="header_phone_icons" id="header_phone_icons">
            <Link onClick={phoneDone} className="header_phone_icon" to={signin}>{SIGN1}</Link>
            {userI ? (
              <>
            <Link onClick={phoneDone} className="header_phone_icon" to='/home'>Home</Link>
            <Link onClick={phoneDone} className="header_phone_icon" to='/friends'>Friends</Link>
            <Link onClick={phoneDone} className="header_phone_icon" to='/feed'>Feed</Link>
            <Link onClick={phoneDone} className="header_phone_icon" to='following'>Following</Link>
            <Link onClick={phoneDone} className="header_phone_icon" to='followers'>Followers</Link>
            <Link onClick={phoneDone} className="header_phone_icon" to='you'>Your Page</Link>
            </>
            ):""}
            <Link onClick={logout} className="header_phone_icon" to={signup == "/logout" ? "" : "/signup"}>{SIGN2}</Link>
        </div>
        <div id="block" className="block"></div>
    </div>
  )
}

export default Header