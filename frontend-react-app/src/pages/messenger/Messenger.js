import React, { useContext, useEffect, useRef, useState } from 'react';
import "./messenger.css";
import Navbar from "../../react-components/navbar/Navbar.js";
import Conversation from '../../react-components/conversations/Conversation';
import Message from '../../react-components/message/Message';
import OnlineChat from '../../react-components/onlineChat/OnlineChat';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import {io} from "socket.io-client";

function Messenger() {
    
    const [conversations, setConversations] = useState([]);
    const [currentChat, setcurrentChat] = useState(null);
    const [messages, setmessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    const {user} = useContext(AuthContext);

    useEffect(() => {
       socket.current = io("ws://localhost:8900"); 
       socket.current.on("getMessage", data => {
          setarrivalMessage({
             sender: data.senderId,
             text: data.text,
             createdAt: Date.now()
          });  
       });

    }, []);

    useEffect(() => {
       arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender) &&
       setmessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
       socket.current.emit("addUser", user?._id);
       socket.current.on("getUsers", users => {
         setOnlineUsers(
            user?.following?.filter((f) => users.some((u) => u.userId === f))
          );
       })
    }, [user]);
    
    useEffect(() => {
       const getConversations = async () => {
          try {
            const res = await axios.get("/conversations/" + user?._id);
            setConversations(res.data);
          } catch (err) {
             console.log(err); 
          }
       }
        getConversations();
    }, [user?._id]);

    useEffect (() => {
      const getMessages = async () => {
         try {
           const res = await axios.get("/messages/" + currentChat?._id);
           setmessages(res.data);
         } catch (err) {
            console.log(err); 
         }
      }
       getMessages();
    }, [currentChat]); 

    const handleSubmit = async(e) => {
       e.preventDefault();
       const message = {
          sender: user?._id,
          text: newMessage,
          conversationId: currentChat?._id
       };

       const receiverId = currentChat?.members?.find(
         (member) => member !== user._id
       );
   
       socket.current.emit("sendMessage", {
         senderId: user._id,
         receiverId,
         text: newMessage,
       });
          
       try {
         const res = await axios.post("/messages", message);
         setmessages([...messages, res.data]);
         setnewMessage("");
       } catch (err) {
          console.log(err);
       }
    };


    useEffect (() => {
      scrollRef?.current?.scrollIntoView({behavour: "smooth"});
    }, [messages]);

    return (
       <>
        <Navbar/> 
        <div className="messenger">
           <div className="chatMenu">
               <div className="chatMenuWrapper">
                  <input placeholder = "Search for friends" className="chatMenuInput" />
                  {conversations.map((c) => (
                     <div key = {c._id} onClick = {() => setcurrentChat(c)}> 
                     <Conversation key = {c._id} conversation = {c} currentUser = {user}/> 
                     </div>
                  ))}
               </div>
           </div>
           <div className="chatBox">
               <div className="chatBoxWrapper">
                  {
                    currentChat ?   
                  <>  
                  <div className="chatBoxTop">
                      {messages.map((m) => {
                        return ( 
                         <div key = {m._id} ref = {scrollRef}>
                         <Message key = {m._id} message = {m} my = {m.sender === user._id} />
                         </div> )
                      })}
                  </div>
                  <div className="chatBoxBottom">
                      <textarea 
                      className = "chatMessageInput" placeholder = "write something..."
                       onChange = {(e) => setnewMessage(e.target.value)}
                       value = {newMessage}
                      ></textarea>
                      <button className="chatSubmitButton" onClick = {handleSubmit}>Send</button>
                  </div>
                  </> : <span className = "noConversationText">Select a conversation to start a chat.</span>}
               </div>
           </div>
           <div className="chatOnline">
               <div className="chatOnlineWrapper">
                 <OnlineChat
                    onlineUsers = {onlineUsers}
                    currentId = {user._id}
                    setcurrentChat = {setcurrentChat}
                 />
               </div>
           </div>
        </div>
       </>
    )
}

export default Messenger;
