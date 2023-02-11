import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
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
            <Link className="header_icon" to="/">HOME</Link>
            <Link className="header_icon" to="/signup">SIGN UP</Link>
        </div>
    </div>
        <div className="header_phone_icons" id="header_phone_icons">
            <Link className="header_phone_icon" to="/">HOME</Link>
            <Link className="header_phone_icon" to="/signup">SIGN UP</Link>
        </div>
        <div id="block" className="block"></div>
    </div>
  )
}

export default Header