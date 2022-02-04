import React from 'react';
import Navbar from '../../react-components/navbar/Navbar.js';
import Sidebar from '../../react-components/sidebar/Sidebar.js';
import Feed from '../../react-components/feed/Feed.js';
import Rightbar from '../../react-components/rightbar/Rightbar.js';
import "./homepage.css"

function homepage() {
    return (
        <>
         <Navbar/>
         <div className="homeCtr"> 
           <Sidebar/>
           <Feed/>
           <Rightbar/>
         </div>
        </>

    )
}

export default homepage
