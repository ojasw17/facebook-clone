import {React, useContext, useEffect, useState} from 'react';
import "./rightbar.css";
import Online from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove, Chat} from "@material-ui/icons";

function Rightbar({user}) {

    const [friends, setFriends] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser?.following?.includes(user?._id));
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
      const isFriend = currentUser?.following?.includes(user?._id);
      setFollowed(isFriend);
    }, [currentUser, user]);

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + currentUser?._id);
          setFriends(friendList?.data);
        } catch (err) {
           console.log(err);
        }
      };
        getFriends();

    }, [currentUser])

    useEffect(() => {
      const getUserFriends = async () => {
        try {
          const userFriendList = await axios.get("/users/friends/" + user?._id);
          setUserFriends(userFriendList?.data);
        } catch (err) {
           console.log(err);
        }
      };
        getUserFriends();

    }, [user])

    const handleClick = async (e) => {
      e.preventDefault(); 
      try {
         if (followed) {
            await axios.put("/users/" + user?._id + "/unFollow", {userId: currentUser?._id});
            dispatch({type: "UNFOLLOW", payload: user?._id}); 
         } else {
            await axios.put("/users/" + user?._id + "/follow", {userId: currentUser?._id}); 
            dispatch({type: "FOLLOW", payload: user?._id});
         }
         setFollowed(!followed);
      } catch (err) {
         console.log(err);
      }
    };


    const HomeRightbar = () => {
       return (
          <>
            <div className="birthdayCtr">
                   <img src="/images/gift.png" alt="" className="birthdayImage" />
                   <span className = "birthdayText">
                   <b>Jane</b> and <b>3 other friends</b> have a birthday today.
                   </span>
               </div>
               <img src="/images/ad.jpg" alt="" className="rightbarAd" />
               <h4 className="rightbarTitle">Online Friends</h4>
               <ul className="rightbarFriendList">
                   {friends.map(friend => {
                    return(
                     <Link to = {"/profile/" + friend?.userName} style = {{textDecoration: "none"}}>
                      <Online key = {friend?._id} user = {friend} /> 
                     </Link>
                    )
                   })}
               </ul> 
          </> 
       ) 
    }

    const ProfileRightbar = () => {
        return (
           <>
             {user?.userName !== currentUser?.userName && (
               <>
               <button className = "rightbarFollowbutton" onClick = {handleClick}>
                 {(followed) ? "Remove Friend" : "Add Friend"}    
                 {(followed) ? <Remove/> : <Add/>}  
               </button>
               <Link to = {"/messenger"}>
               <button className = "rightbarFollowbutton">  
                 {<Chat/>}  
               </button>
               </Link>
               </>
             )}
             <h4 className = "rightbarTitle">User Information</h4>
             <div className="rightbarInfo">
                 <div className="rightbarInfoItem">
                     <span className="rightbarInfoKey">City:</span>
                     <div className="rightbarInfoValue">{user?.city}</div>
                 </div>
                 <div className="rightbarInfoItem">
                     <span className="rightbarInfoKey">From:</span>
                     <div className="rightbarInfoValue">{user?.GoesTo}</div>
                 </div>
                 <div className="rightbarInfoItem">
                     <span className="rightbarInfoKey">Relationship:</span>
                     <div className="rightbarInfoValue">
                     {user?.relationship === 1 ? "Single" : user?.relationship === 2 ? "Married" : "-"}
                     </div>
                 </div>
             </div>
             <h4 className = "rightbarTitle">User Friends</h4>
             <div className="rightbarFollowings">
                 {userFriends.map(friend => {
                    return(
                     <Link to = {"/profile/" + friend?.userName} style = {{textDecoration: "none"}}>
                      <div key = {friend._id} className="rightbarFollowing">
                        <img key = {friend.createdAt} src={friend?.profilePicture ? PF + friend?.profilePicture : PF + "person/no-image1.png"} alt="" className="rightbarFollowingImage" /> 
                        <span key = {friend.userName} className="rightbarFollowingName">{friend?.userName}</span>
                      </div>
                     </Link>
                    )
                 })}
             </div>
           </>
        ) 
     }

    return (
        <div className = "rightbar">
           <div className="rightbarWrapper">
               {user ? <ProfileRightbar/> : <HomeRightbar/>}
           </div> 
        </div>
    )
}

export default Rightbar;
