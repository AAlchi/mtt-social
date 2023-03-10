import React, { useEffect, useState } from 'react'
import './style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';
import axios from 'axios';



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


    let fileid = Math.random(1, 2000)
    let fileids = `/post_image/${fileid}`

    const uploadFiles = (file) => {
     if (!file) return;
      const storageRef = ref(storage, fileids)
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
        let image = `https://firebasestorage.googleapis.com/v0/b/mtt-social-b1623.appspot.com/o/post_image%2F${fileid}?alt=media`;

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
        axios.post('https://mtt-social-backend.onrender.com/getPost').then(res => setPosts(res.data))
    })


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

    let name = userI.fName + " " + userI.lName;




    //like/dislike

    const postDislike = () => {
        alert('j')
    }


    const [id, setId] = useState([{
        _id: '',
        username: ''
    }])


    const postUnlike = (postid) => {
        axios.post('https://mtt-social-backend.onrender.com/unlikePost', { userid: userI._id, postid: postid}).finally(document.getElementById('loading').innerHTML = "Loading...")
    }

    const postLike = (postid) => {
        axios.post('https://mtt-social-backend.onrender.com/likePost', { userid: userI._id, postid: postid}).finally(document.getElementById('loading').innerHTML = "Loading...")
    }


    useEffect(() => {
        axios.post('https://mtt-social-backend.onrender.com/checkLikedPosts', {username: userI.username}).then(res => setId(res.data))
    })

    let toggle = false

    let [postingid, setPostingId] = useState('');

    const card = (postid) => {
        document.getElementById('postingDone').style.display = "flex"
        setPostingId(postid)
        window.scrollTo(0, 0)
    }
     
    return (
        <>
<div className="title">
                <center><h1>MTT SOCIAL</h1></center>
                     <div onClick={phone} className="phone">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            
           
            <div className='index'>
               
            {width < 550 ? (
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
                
                 <div className="info">
        
                <img src={userI.image} alt={name} />
                <center><h2>Welcome, {name}!</h2></center>
                <center><p>Profile Image Link: {userI.dob.substring(0, 10)}</p></center>
                <center><p>Account ID: {userI._id}</p></center>
                <center><p>First Name: {userI.fName}</p></center>
                <center><p>Last Name: {userI.lName}</p></center>
                
                    
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
                        {
                            posts.map((post) => (
                <div onClick={() => card(post._id)} key={post._id} className='card'>
                    <div className='person'>
                        <Link to={`/${post.username}`} className='profile_img_name'>
                        <div className='profilePic'><img src={post.profilePic} alt={post.username}/></div>
                        <div className="author">From: {post.name}</div>
                        </Link>
                        <div className="date">On: {post.date}</div>
                    </div>
                    <div className='image_post_card'><img className="imgPost" src={post.image} alt={post.name} /></div>
                    <p>{post.description}</p>
                    <h4>{post.like} likes</h4>
                    <div className='person'>
                        {id.filter(x => x._id === post._id) != '' ? (<button onClick={() => postUnlike(post._id)} className='postButton white'><FontAwesomeIcon icon={faHeart}/><span id="loading">Unlike This</span></button>
) : (<button onClick={() => postLike(post._id)} className='postButton'><FontAwesomeIcon icon={faThumbsUp} /><span id="loading">Like This</span></button>
)}
                    <button onClick={postDislike} className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</button>
                    </div>
                </div>
            )).reverse()
                        }   


             
           
            
            </div>
                </div>

                {posts.filter(x => x._id === postingid).map((post) => (
                <div id='postingDone'>
                    {post._id}
                </div>
            )).reverse()
                        }   
         
                {width > 550 ? (

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
