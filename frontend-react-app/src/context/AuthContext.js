import {createContext, useReducer, useEffect} from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
   user: JSON.parse(localStorage.getItem("user")) || null,
   isFetching: false,
   error: false 
}

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}) => {
   const [state, dispatch] = useReducer(AuthReducer, initialState);

   useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

   return (
      <AuthContext.Provider 
      value = {{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch  
      }}>
       {children}
      </AuthContext.Provider> 
   )
}