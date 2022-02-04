import React, { useContext, useRef, useState } from 'react';
import "./share.css";
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function Share() {

    const {user} = useContext(AuthContext);
    const description = useRef();
    const [file, setFile] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const submitHandler = async (e) => {
       e.preventDefault();
       const newPost = {
          userId: user._id,
          description: description.current.value,
          img: "" 
       }
        
       if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file); 
          newPost.img = fileName;
          console.log(file);
          try {
            await axios.post("/upload", data); 
          } catch (err) {
             console.log(err); 
          }
       }

       try {
         await axios.post("/posts", newPost);
         window.location.reload();
       } catch (err) {
          console.log(err);
       } 
    };

    return (
        <div className = "share">
           <div className="shareWrapper">
               <div className="shareTop">
                 <img src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/no-image1.png"} alt="" className="shareProfileImage" /> 
                  <input placeholder = {"Whats's on your mind " + user.userName + " ?"} ref = {description} className="shareInput" />
               </div>
               <hr className="shareHr" />
               {file && (
                 <div className="shareImageCtr">
                     <img src={URL.createObjectURL(file)} alt="" className="shareImage" />
                     <Cancel className = "shareCancelImage" onClick = {() => setFile(null)} />
                 </div>  
               )}
               <form className="shareBottom" onSubmit = {submitHandler}>
                   <div className="shareOptions">
                       <label htmlFor = "file" className="shareOption">
                           <PermMedia htmlColor = "tomato" className = "shareIcon"/>
                           <span className = "shareOptionText">Photo or Video</span>
                           <input style = {{display: "none"}} type = "file" id = "file" accept = ".png, .jpeg, .jpg" onChange = {(e) => setFile(e.target.files[0])}/>
                       </label>
                       <div className="shareOption">
                           <Label htmlColor = "blue" className = "shareIcon"/>
                           <span className = "shareOptionText">Tag</span>
                       </div>
                       <div className="shareOption">
                           <Room htmlColor = "green" className = "shareIcon"/>
                           <span className = "shareOptionText">Location</span>
                       </div>
                       <div className="shareOption">
                           <EmojiEmotions htmlColor = "goldenrod" className = "shareIcon"/>
                           <span className = "shareOptionText">Feelings</span>
                       </div>
                   </div>
                   <button className="shareButton" type = "submit">Share</button>
               </form>
           </div> 
        </div>
    )
}

export default Share
