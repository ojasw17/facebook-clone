export const LoginStart = (userCredentials) => ({
  type: "Login-Start",
});

export const LoginSuccess = (user) => ({
   type: "Login-Success",
   payload: user
});

export const LoginFailure = (error) => ({
   type: "Login-Failure",
   payload: error
});  

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId
});

export const Unfollow = (userId) => ({
   type: "UNFOLLOW",
   payload: userId
});

export const Logout = (user) => ({
   type: "Logout-Start",
})