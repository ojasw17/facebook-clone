const AuthReducer = (state, action) => {
   switch (action.type) {
      case "Login-Start":
         return ({
           user: null,
           isFetching: true,
           error: false  
         })
      case "Login-Success":
         return ({
            user: action.payload,
            isFetching: false,
            error: false  
         }) 
      case "Login-Failure":
          return ({
            user: null,
            isFetching: false,
            error: action.payload 
          })  
      case "Logout-Start": 
          localStorage.clear();
          return ({
            user: null,
            isFetching: false,
            error: false
          })    
      case "FOLLOW":
          return ({
              ...state,
              user: {
                 ...state.user,
                 following: [...state.user.following, action.payload]
              }
          })     
      case "UNFOLLOW":
          return ({
              ...state,
              user: {
                 ...state.user,
                 following: state.user.following.filter(followingId => followingId !== action.payload)
              }
          })         
      default:
         return state;     
   } 
}

export default AuthReducer;