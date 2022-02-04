const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {

   try{
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt); 

     const newUser = new User({
       userName: req.body.userName,
       email: req.body.email,
       password: hashPassword, 
       // city: req.body.city,
       // GoesTo: req.body.GoesTo,
       // description: req.body.description,
       // relationship: req.body.relationship
     }) 

     const user = await newUser.save();
     res.status(200).json(user); 
   } catch (err) {
      res.status(500).json(err);
   }

});

router.post("/login", async (req, res) => {
  try { 
   const user = await User.findOne({email: req.body.email});
    !user && res.status(404).json("user not found");

   const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(404).json("Wrong Password");

   res.status(200).json(user);
  } catch (err) {
     res.status(500).json(err);
  } 
});

module.exports = router;