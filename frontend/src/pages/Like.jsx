import React, { useEffect, useState } from 'react'
import './style.css';
import { faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import axios, { all } from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Like() {
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




    
    const [posts, setPosts] = useState([{
        _id: '',
        name: '',
        image: '',
        date: '',
        description: '',
        postId: '',
        profilePic: '',
        username: '',
    }])

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        
        axios.post('https://mtt-social-backend.onrender.com/getLikedPosts', {
            email: userI.email
        }).then(res => setPostData(res.data.likes))
    })


    useEffect(() => {
        axios.post('https://mtt-social-backend.onrender.com/getLikedPostsData', {
            id: postData
        }).then(res => setPosts(res.data))
    })



  
    
   const phone = () => {
        let phone = document.getElementById('sidebar');

        if (phone.style.display === "flex") {
            phone.style.display = "none";
        } else {
            phone.style.display = "flex";
        }
    }
       var width  = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;

    
    
    return (
        <>
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
        
    
        <div className='posts'>
        <h2>Liked Posts</h2>

            {posts.map((post) => (
                <div key={post._id} className='card'>
                    <div className='person'>
                        <Link to={`/${post.username}`} className='profile_img_name'>
                        <div className='profilePic'><img src={post.profilePic} alt={post.username}/></div>
                        <div className="author">From: {post.name}</div>
                        </Link>
                        <div className="date">On: {post.date}</div>
                    </div>
                    <div className='image_post_card'><img className="imgPost" src={post.image} alt={post.name} /></div>
                    <p>{post.description}</p>
                    <h6>{post.like} likes</h6>
                    <div className='person'>
                    <button onClick={() => axios.post('https://mtt-social-backend.onrender.com/unlikePost', { userid: userI._id, postid: post._id}).then(res => console.log(res.data))} className='postButton white'><FontAwesomeIcon icon={faHeart}/>Unlike this</button>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    </div>
                    <button onClick={() => window.scrollTo(0,0)}>Scroll To Top</button>

                    </div>

            )).reverse()}    
            
           
            
            </div>
      
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
    </>
  )
}
