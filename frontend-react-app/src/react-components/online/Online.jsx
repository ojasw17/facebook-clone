import React from 'react';
import "./online.css";

function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImageCtr">
                <img src = {(user?.profilePicture) ? PF + user?.profilePicture: PF + "person/no-image1.png"} alt="" className="rightbarProfileImage" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user?.userName}</span>
        </li>
    )
}

export default Online
