import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Redirect() {
    
  let r = window.location.href;
  const navigate = useNavigate()
  useEffect(() => {
  if (r === 'https://social.derarchitecture.com/signin') {
    navigate('/signin')
  } else if (r === 'https://social.derarchitecture.com/signup') {
    navigate('/signup')
  } else if (r === 'https://social.derarchitecture.com/home') {
    navigate('/home')
  } else if (r === 'https://social.derarchitecture.com/account') {
    navigate('/account')
  } else if (r === 'https://social.derarchitecture.com/friends') {
    navigate('/friends')
  } else if (r === 'https://social.derarchitecture.com/like') {
    navigate('/like')
  } else if (r === 'https://social.derarchitecture.com/followers') {
    navigate('/followers')
  } else if (r === 'https://social.derarchitecture.com/following') {
    navigate('/following')
  } else if (r === `https://social.derarchitecture.com/:id`) {
    navigate(`/:id`)
  } 
  })
  
  return (
    <div></div>
  )
}
