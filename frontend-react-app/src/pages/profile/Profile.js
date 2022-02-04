import {React, useState, useEffect} from 'react';
import Navbar from '../../react-components/navbar/Navbar.js';
import Sidebar from '../../react-components/sidebar/Sidebar.js';
import Feed from '../../react-components/feed/Feed.js';
import Rightbar from '../../react-components/rightbar/Rightbar.js';
import "./profile.css";
import axios from 'axios';
import {useParams} from "react-router";

function Profile() {
   const [user, setUser] = useState({});
   const username = useParams().username;

   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   useEffect(() => {
       const fetchUser = async () => {
          const res = await axios.get(`/users/?userName=${username}`);
          setUser(res.data); 
       }
        fetchUser();
   }, [username]);

    return (
        <>
         <Navbar/>
         <div className="profile"> 
           <Sidebar/>
           <div className="profileRight">
               <div className="profileRightTop">
                 <div className="profileCover">
                    <img src={(user?.coverPicture) ? PF + user?.coverPicture : PF + "no-cover1.jpg"} alt="" className="profileCoverImage" /> 
                    <img src={(user?.profilePicture) ? PF + user?.profilePicture : PF + "person/no-image1.png"} alt="" className="profileUserImage" />  
                 </div>
                 <div className="profileInfo">
                     <h4 className = "profileInfoName">{user?.userName}</h4>
                     <span className="profileInfodescription">{user?.description}</span>
                 </div>
               </div>
               <div className="profileRightBottom">
                   <Feed username = {username}/>
                   <Rightbar user = {user}/>
               </div> 
           </div>
         </div>
        </>
    )
}

export default Profile
