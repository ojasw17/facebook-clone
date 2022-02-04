import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
   dispatch({type: "Login-Start"});
   try {
     const res = await axios.post("auth/login", userCredential);
     dispatch({type: "Login-Success", payload: res.data});
   } catch (err) {
     dispatch({type: "Login-Failure", payload: err});
   } 
}

export const logoutCall = (dispatch) => {
   dispatch({type: "Logout-Start"});
}