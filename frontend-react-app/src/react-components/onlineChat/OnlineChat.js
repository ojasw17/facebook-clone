import {React, useEffect, useState} from 'react';
import "./onlineChat.css";
import axios from "axios";

function OnlineChat({onlineUsers, currentId, setcurrentChat}) {

   const [friends, setFriends] = useState([]);
   const [onlineFriends, setOnlineFriends] = useState([]);
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user?._id}`);
      setcurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
   };

   return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImageCtr">
            <img
              className="chatOnlineImage"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/no-image1.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.userName}</span>
        </div>
      ))}
    </div>
  );
}

export default OnlineChat
