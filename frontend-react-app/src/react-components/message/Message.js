import React from 'react';
import "./message.css";
import {format} from "timeago.js";

function Message({message, my}) {
    return (
        <div className={my ? "message my" : "message"}>
           <div className="messageTop">
               <img src="/images/post/6.jpg" alt="" className="messageImage" />
               <p className="messageText">{message.text}</p>
           </div>
           <div className="messageBottom">{format(message.createdAt)}</div> 
        </div>
    )
}

export default Message
