import React, { useContext } from "react";
import Homepage from "./pages/home/Homepage.js";
import Login from "./pages/login/Login.js";
import Profile from "./pages/profile/Profile.js";
import Register from "./pages/register/Register.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import Messenger from "./pages/messenger/Messenger.js";

function App() {

  const {user} = useContext(AuthContext);

  return (
     <Router>
       <Routes>
         <Route path = "/" element = {user ? <Homepage/> : <Register/>} />
         <Route path = "/login" element = {user ? <Navigate to = "/" /> : <Login/>} />
         <Route path = "/register" element =  {user ? <Navigate to = "/" /> : <Register/>} />
         <Route path = "/profile/:username" element = {<Profile/>} />
         <Route path = "/messenger" element = {!user ? <Navigate to = "/" /> : <Messenger/>} />
       </Routes>
     </Router> 
  );
}

export default App;
