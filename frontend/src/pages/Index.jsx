import React, { useEffect, useState } from 'react'
import './style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import data from './data';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';


export default function Index() {
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
  
    
    const phoneThing = () => {
        const side = document.getElementById('sidebar');

        if (side.style.display === "flex") {
            side.style.display = "none";
        } else {
            side.style.display = "flex";
        }
    }

    const uploadFiles = (file) => {
     if (!file) return;
      const storageRef = ref(storage, `/post_image/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
      }, (err) => console.log(err),
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => console.log(url))
          })

    }
    

    const post = (e) => {
        e.preventDefault()
        let text = document.getElementById('postText').value;
        const file = e.target[0].files[0];
        uploadFiles(file)
        let image = `https://firebasestorage.googleapis.com/v0/b/mtt-social-4cf10.appspot.com/o/post_image%2F${file.name}?alt=media`;
        const newPost = {
            name: userI.fName + " " + userI.lName,
            image: image,
            description: text,
            postId: userI.username,
            profilePic: userI.image,
            username: userI.username,
        }
        axios.post('http://localhost:5000/post', newPost).then(res => console.log(res.data))
        //document.getElementById('alerts').innerHTML = "Refresh The Page To See Your Post!"
    }


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


    useEffect(() => {
        axios.post('http://localhost:5000/getPost').then(res => setPosts(res.data))
    })
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
                <li onClick={like}>Liked Posts</li>
                <li onClick={account}>Account</li>
                <li onClick={friends}>Freinds</li>
                <li onClick={following}>Following</li>
                <li onClick={followers}>Followers</li>
                <li onClick={logout}>Log Out</li>
            </ul>
        </div>
        <div>
            <form onSubmit={post}  className="post">
            <h2>What's Goin' On, {userI.username}?</h2>
            <h6>Choose An Image:</h6>
            <input type="file" accept="image/*"/>
            <h6>Share something</h6>
            <input type="text" id="postText" className='input_post' placeholder='  Type Here...'/>
                        <button type="submit" className='button_post'>Post</button>
                        <span id="alerts"></span>
            </form>
            <div className='posts'>
            {posts.map((post) => (
                <div key={post._id} className='card'>
                    <div className='person'>
                        <Link to={`/${post.username}`} className='profile_img_name'>
                        <img src={post.profilePic} alt={post.username} className="profile_Pic"/>
                        <div className="author">From: {post.name}</div>
                        </Link>
                        <div className="date">On: {post.date}</div>
                    </div>
                    <img className="imgPost" src={post.image} alt={post.name} />
                    <p>{post.description}</p>
                    <div className='person'>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsUp} /> I like this</div>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    </div>
                </div>
            )).reverse()}    
            
           
            
            </div>
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
