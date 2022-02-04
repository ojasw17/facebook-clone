const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

// Register a user

router.put("/:id", async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
         try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         } catch (err) {
            return res.status(500).json(err);
         }
      }
      try {
         const user = await User.findByIdAndUpdate(req.params.id, {
           $set: req.body, 
         });
         res.status(200).json("Succesfully Updated");
      } catch (err) {
         return res.status(500).json(err);
      }

   } else {
      return res.status(403).json("Not Allowed");
   }
});

// Delete a user

router.delete("/:id", async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
         const user = await User.findByIdAndDelete(req.params.id);
         res.status(200).json("Succesfully Deleted");
      } catch (err) {
         return res.status(500).json(err);
      }

   } else {
      return res.status(403).json("Not Allowed");
   }
});

// Show user

router.get("/", async (req, res) => {
   const userId = req.query.userId;
   const userName = req.query.userName;
   try {
      const user = userId ? await User.findById(userId) : await User.findOne({userName: userName});
      const {password, updatedAt, ...other} = user._doc;
      res.status(200).json(other);
   } catch (err) {
         return res.status(500).json(err);
   }
});

// get all followings

router.get("/friends/:userId", async (req, res) => {
 
   try {
     const user = await User.findById(req.params.userId);
     const friends = await Promise.all(
       user.following.map(friendId => {
         return User.findById(friendId);
       }) 
     );

     let friendList = [];
     friends.map(friend => {
        const {_id, userName, profilePicture} = friend;
        friendList.push({_id, userName, profilePicture});
     })  
     res.status(200).json(friendList);
   } catch (err) {
      res.status(500).json(err);
   }

});


// Follow a user

router.put("/:id/follow", async (req, res) => {
   if (req.body.userId !== req.params.id) {
     try {
       const user = await User.findById(req.params.id);
       const currentUser = await User.findById(req.body.userId);
       if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: {followers: req.body.userId}});
          await currentUser.updateOne({ $push: {following: req.params.id}});
          res.status(200).json("User Followed");
       } else {
          res.status(403).json("You Already Follow this User");
       }
     } catch (err) {

     }
   } else {
     res.status(403).json("Invalid Follow Request");
   }
});

// Unfollow a user

router.put("/:id/unFollow", async (req, res) => {
   if (req.body.userId !== req.params.id) {
     try {
       const user = await User.findById(req.params.id);
       const currentUser = await User.findById(req.body.userId);
       if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: {followers: req.body.userId}});
          await currentUser.updateOne({ $pull: {following: req.params.id}});
          res.status(200).json("User unFollowed");
       } else {
          res.status(403).json("You dont follow this User");
       }
     } catch (err) {

     }
   } else {
     res.status(403).json("Invalid unFollow Request");
   }
});

module.exports = router;