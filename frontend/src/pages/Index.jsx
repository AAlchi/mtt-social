import React, { useEffect } from 'react'
import './style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';


export default function Index() {
    const userI = JSON.parse(localStorage.getItem('USER'))
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
  
  
  
    const navigate = useNavigate();
  
  
    useEffect(() => {
      if (userI) {
        navigate(redirect);
      }
    }, [navigate, redirect, userI]);
  
    const logout = () => {
        localStorage.removeItem('USER')
    }

    
    const phoneThing = () => {
        const side = document.getElementById('sidebar');

        if (side.style.display == "flex") {
            side.style.display = "none";
        } else {
            side.style.display = "flex";
        }
    }
    return (
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
                <li>Home</li>
                <li>Freinds</li>
                <li>Account</li>
                <li>Feed</li>
                <li>Following</li>
                <li>Followers</li>
                <li>Your Page</li>
                <li onClick={logout}>Log Out</li>
            </ul>
        </div>
        <div>
            <div className="post">
            <h2>What's Goin' On, {userI.username}?</h2>
            <h6>Share something</h6>
            <input type="text" className='input_post' placeholder='  Type Here...'/>
            <h6>Choose An Image:</h6>
            <input type="file" />
            <button className='button_post'>Post</button>
            </div>
            <div className='posts'>
                
            <div className='card'>
                    <div className='person'>
                    <div className="author">From: Jerry M. Michal</div>
                    <div className="date">On: Oct, 15, 2023</div>
                    </div>
                    <img className="imgPost" src="https://th.bing.com/th/id/R.892bb645c09c766efcc5bc4d0c93094a?rik=slmcvUaa5yToAw&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2015%2f12%2fNature-Lake-Bled.-Desktop-background-image.jpg&ehk=c2raFC95S12P3OL0%2fwdM60ro3oUxsSEajkuGEN%2fsjbo%3d&risl=1&pid=ImgRaw&r=0" alt="image" />
                    <p>Check out this beautiful place I went to over the summer! Very cool!</p>
                    <div className='person'>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsUp} /> I like this</div>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    </div>
            </div>
            <div className='card'>
                    <div className='person'>
                    <div className="author">From : Jerry M. Michal</div>
                    <div className="date">On: Oct, 15, 2023</div>
                    </div>
                    <img className="imgPost" src="https://th.bing.com/th/id/R.892bb645c09c766efcc5bc4d0c93094a?rik=slmcvUaa5yToAw&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2015%2f12%2fNature-Lake-Bled.-Desktop-background-image.jpg&ehk=c2raFC95S12P3OL0%2fwdM60ro3oUxsSEajkuGEN%2fsjbo%3d&risl=1&pid=ImgRaw&r=0" alt="image" />
                    <p>Check out this beautiful place I went to over the summer! Very cool!</p>
                    <div className='person'>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsUp} /> I like this</div>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    </div>
            </div>
            <div className='card'>
                    <div className='person'>
                    <div className="author">From : Jerry M. Michal</div>
                    <div className="date">On: Oct, 15, 2023</div>
                    </div>
                    <img className="imgPost" src="https://th.bing.com/th/id/R.892bb645c09c766efcc5bc4d0c93094a?rik=slmcvUaa5yToAw&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2015%2f12%2fNature-Lake-Bled.-Desktop-background-image.jpg&ehk=c2raFC95S12P3OL0%2fwdM60ro3oUxsSEajkuGEN%2fsjbo%3d&risl=1&pid=ImgRaw&r=0" alt="image" />
                    <p>Check out this beautiful place I went to over the summer! Very cool!</p>
                    <div className='person'>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsUp} /> I like this</div>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    </div>
            </div>
            <div className='card'>
                    <div className='person'>
                    <div className="author">From : Jerry M. Michal</div>
                    <div className="date">On: Oct, 15, 2023</div>
                    </div>
                    <img className="imgPost" src="https://th.bing.com/th/id/R.892bb645c09c766efcc5bc4d0c93094a?rik=slmcvUaa5yToAw&riu=http%3a%2f%2fwww.wallpapers13.com%2fwp-content%2fuploads%2f2015%2f12%2fNature-Lake-Bled.-Desktop-background-image.jpg&ehk=c2raFC95S12P3OL0%2fwdM60ro3oUxsSEajkuGEN%2fsjbo%3d&risl=1&pid=ImgRaw&r=0" alt="image" />
                    <p>Check out this beautiful place I went to over the summer! Very cool!</p>
                    <div className='person'>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsUp} /> I like this</div>
                    <div className='postButton'><FontAwesomeIcon icon={faThumbsDown} /> Not For Me</div>
                    </div>
            </div>
            
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
  )
}
