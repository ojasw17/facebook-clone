import "./navbar.css";
import {Search, Person, Chat, Notifications, ExitToApp} from "@material-ui/icons";
import {Link} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import {logoutCall} from "../../apiCalls.js";

export default function Navbar() {

   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const {user, dispatch} = useContext(AuthContext);

   const handleClick = () => {
      logoutCall(dispatch);
   };

   return (
      <div className = "navbarCtr">
         <div className="navbarLeft"> 
           <Link to = "/" style = {{textDecoration: "none"}}>
           <span className="logo">facebook</span>
           </Link>
         </div>
         <div className="navbarCenter">
           <div className="searchbar">
              <Search className = "searchIcon"/>
              <input placeholder="Search Facebook" className="searchInput" />
           </div>
         </div>
         <div className="navbarRight">
            <div className="navbarLinks">
               <button className = "navbarLinksButton" onClick = {handleClick}>{<ExitToApp htmlColor = "white"/>}</button>
               <span className="navbarLink"> Logout</span> 
            </div>
            <div className="navbarIcons">
               <div className="navbarIconItem">
                  <Person/>
                  <span className="navbarIconBadge">1</span>
               </div>
               <div className="navbarIconItem">
                  <Chat/>
                  <span className="navbarIconBadge">1</span>
               </div>
               <div className="navbarIconItem">
                  <Notifications/>
                  <span className="navbarIconBadge">1</span>
               </div>
            </div> 
            <Link to = {`/profile/${user?.userName}`}>
            <img src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/no-image1.png"} alt="" className="navbarImg" />
            </Link>
         </div>
      </div> 
   );
}