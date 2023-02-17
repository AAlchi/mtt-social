import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header';

function Home() {
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
  



  return (
    <>
    <Header />

    <div className="home">

      <div className="home_welcome">
        <center>Welcome To MTT Media</center>
        <Link className="home_signin_button" to="/signin">Sign In</Link>
      </div>
      <div className="home_welcome2">
        <div>
        <h2>Who We Are</h2>
        <p>We are a social media platform designed for kids. This is a private social media platform. So it is always being looked at for new users. So it is invite only. Any user added is able to be tracked. But aside from that, this social media platform offers kids at a young age a clean and fun way to access social media. Without anything bad, or their brains getting bad. So I hope you enjoy! INVITE ONLY. YOU ARE TRACKABLE!
        </p>
        </div>
        <div className='home_img'></div>
      </div>
      <div className="home_contact">
        <div className='contact_title'>Contact Information:</div>
        <div className='home_contact_info'>
          <div>
          Email: alialchi07@gmail.com
          </div>
          <div>
          Phone: 312-799-1224
          </div>
          <div>
          VPN Used
          </div>
        </div>
        <div className='home_footer'>Copyright @2023</div>
      </div>
    </div>
    </>
  )
}

export default Home