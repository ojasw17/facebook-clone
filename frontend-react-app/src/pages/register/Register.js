import React, { useRef } from 'react';
import "./register.css";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

function Register() {
    
    const userName = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => { 
       e.preventDefault();
       if (passwordAgain.current.value !== password.current.value) {
         password.current.setCustomValidity("Passwords dont Match!"); 
       } else {
         const user = {
           userName: userName.current.value,
           email: email.current.value,
           password: password.current.value
         }
         try {
           await axios.post("/auth/register", user);
           navigate("/login");
         } catch (err) {
           console.log(err);  
         } 
       }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                   <h3 className="loginLogo">facebook</h3>
                   <span className="loginDescription">
                     Connect with friends and the world around you on facebook.  
                   </span> 
                </div>
                <div className="loginRight">
                   <form className="loginBox" onSubmit ={handleClick}>
                       <input placeholder = "Username" required ref = {userName} className="loginInput" />
                       <input placeholder = "Email" required ref = {email} className="loginInput" type = "email" />
                       <input placeholder = "Password" required ref = {password} className="loginInput" type = "password" minLength = "6" />
                       <input placeholder = "Password Again" required ref = {passwordAgain} className="loginInput" type = "password" minLength = "6" />
                       <button className="loginButton" type = "submit">Sign Up</button>
                       <Link to = "/login">
                        <div className="loginRegisterButtonWrapper">
                           <button className="loginRegisterButton">Log into Account</button>
                        </div>
                       </Link>
                   </form> 
                </div>
            </div>
        </div>
    )
}

export default Register;
