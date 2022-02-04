import React, { useContext, useRef} from 'react';
import "./login.css";
import {loginCall} from "../../apiCalls.js";
import { AuthContext } from '../../context/AuthContext';
import  {CircularProgress} from "@material-ui/core";

function Login() {
    
    const email = useRef();
    const password = useRef();
    const {isFetching, dispatch} = useContext(AuthContext);
    

    const handleClick = async (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch); 
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
                <div className="loginRight" >
                   <form className="loginBox" onSubmit ={handleClick}>
                       <input placeholder = "Email" type = "email" required className="loginInput" ref = {email}/>
                       <input placeholder = "Password" type = "password" required className="loginInput" ref = {password} minLength = "6"/>
                       <button className="loginButton" type = "submit" disabled = {isFetching}>
                       {isFetching ? <CircularProgress color = "white" size = "20px" /> : "Log In"}
                       </button>
                       <span className="loginForgot">Forgot Password?</span>
                       <button className="loginregisterButton"> 
                       {isFetching ? <CircularProgress color = "white" size = "20px" /> : "Sign Up"}
                       </button>
                   </form>
                </div>
            </div>
        </div>
    )
}

export default Login
