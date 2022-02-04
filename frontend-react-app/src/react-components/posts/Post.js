import {React, useContext, useEffect, useState} from 'react';
import "./post.css";
import {MoreVert, Delete} from "@material-ui/icons";
import axios from 'axios';
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
      setIsLiked(post.likes.includes(currentUser?._id));
    }, [currentUser?._id, post.likes]);

    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/users/?userId=${post?.userId}`);
        setUser(res?.data);
      }; 
       fetchUser();
    }, [post?.userId]);

    const likeHandler = async () => {
       try {
         await axios.put("/posts/" + post?._id + "/like", {userId: currentUser?._id});
       } catch (err) {
          console.log(err);  
       }
       setLike(isLiked ? like - 1: like + 1); 
       setIsLiked(!isLiked);
    };

    const handleClick = async () => {
       if (!post || !currentUser) return;
       if (post?.userId !== currentUser?._id) return;
       try {
         await axios.delete("/posts/" + post?._id);
         window.location.reload(); 
       } catch (err) {
         console.log(err);
       }
    };

    return (
        <div className = "post">
           <div className="postWrapper">
             <div className="postTop">
               <div className="postTopLeft">
                   <Link to = {`profile/${user?.userName}`}>
                   <img src={user?.profilePicture ? PF + user?.profilePicture :  "/images/person/no-image1.png"} alt="" className="postProfileImage" />
                   </Link>
                   <span className="postUsername">{user?.userName}</span>
                   <span className="postDate">{format(post?.createdAt)}</span>
               </div>
               <div className="postTopRight">
                  <MoreVert/>
               </div>  
             </div>
             <div className="postCenter">
                 <span className="postText">{post?.description}</span>
                 <img src={PF + post?.img} alt="" className="postImage" /> 
             </div>
             <div className="postBottom">
                 <div className="postBottomLeft">
                    <img src="/images/like.png" alt="" className="likeIcon"
                      onClick = {likeHandler}
                    /> 
                    <img src="/images/heart.png" alt="" className="likeIcon"
                      onClick = {likeHandler}
                    />
                    <span className="postLikeCounter">{like} people like it</span>
                 </div>
                 <div className="postBottomRight">
                   <button className = "postBottomRightDelete" onClick = {handleClick}>{<Delete/>}</button>
                 </div>
             </div>  
           </div> 
        </div>
    )
}

export default Post
