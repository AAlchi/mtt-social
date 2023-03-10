import React, { useEffect, useState } from 'react'
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';



export default function You() {
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

    const usernames = window.location.pathname.slice(1).replace("%20", " ");

    let [image, setImage] = useState({});
    let [fName, setFName] = useState('');
    let [lName, setLName] = useState('');
    let [username, setUsername] = useState('');
    let [dob, setDob] = useState('');
    let name = fName + " " + lName;
    useEffect(() => {
        const data = async (req, res) => {
            try {
                await axios.post('https://mtt-social-backend.onrender.com/fetchUser', {
                    username: usernames,
                }).then(res => (
                    // eslint-disable-next-line no-sequences
                    setImage(res.data.image),
                    setFName(res.data.fName),
                    setLName(res.data.lName),
                    setUsername(res.data.username),
                    setDob(res.data.dob)
                ))
                

        } catch (err) {
        } 
        }
        data()
        console.log(image)
    })

    
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
        
        axios.post('https://mtt-social-backend.onrender.com/getUserPost', {
            username: username
        }).then(res => setPosts(res.data))
    })

    const likePost = () => {
        
    }

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
       
        <div>
           
<div className='youstyle'>

          <div className="you">
                        <div className="banner">
                            <div className='bannerImg'><img src={image} alt={fName} /></div></div>
                <div className="you_content">
                <div>
                <div className="you_name">Username: {username}</div> 
                <div className="you_name">Name: {name}</div> 
                <div className="you_name">Born On: {dob.substring(0, dob.length - 14)}</div>
              </div>
                <div>
                    
                <button>Add Friend</button>
                <button>Report</button>
                </div>
            </div>
                    </div>
                    
                     <div className='posts'>
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
                    <div onClick={likePost} className='postButton'><FontAwesomeIcon icon={faThumbsUp} /> I like this</div>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    
                    </div>
                </div>
            )).reverse()}    
            
           
            
            </div>
</div>


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
