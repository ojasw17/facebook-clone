import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./conversation.css";

function Conversation({conversation, currentUser}) {
    
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() =>{
       const friendId = conversation.members.find(m => m !== currentUser._id);
       
       const getUser = async () => {
         try {  
          const res = await axios.get("/users?userId=" + friendId); 
          setUser(res.data);
         } catch (err) {
            console.log(err); 
         }
       };

         getUser(); 

    }, [currentUser, conversation]);
    
    return (
        <div className="conversation">
            <img src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/no-image1.png"} alt="" className="conversationImage" />
            <span className="conversationName">{user?.userName}</span>
        </div>
    )
}

export default Conversation
