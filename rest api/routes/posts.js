const router = require("express").Router();
const Post = require("../Models/Post");
const User = require("../Models/User");

// Create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);  
  }
});

// update a post

router.put("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    try { 
      if (post.userId === req.body.userId) {
        await post.updateOne({$set: req.body});
        res.status(200).json("Post Updated");
      } else {
        res.status(403).json("you cannot update others post"); 
      }
    } catch (err) {
       res.status(500).json(err); 
    }
});

// delete a post

router.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    try { 
        await post.deleteOne();
        res.status(200).json("Post Deleted");
    } catch (err) {
       res.status(500).json(err); 
    }
});

// like / Dislike a post

router.put("/:id/like", async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
      if (!post.likes.includes(req.body.userId)) {
         await post.updateOne({$push: {likes: req.body.userId}});
         res.status(200).json("Liked"); 
      } else {
         await post.updateOne({$pull: {likes: req.body.userId}});
         res.status(200).json("Disliked"); 
      }
    } catch (err) {
      res.status(500).json(err); 
    }
});

// get a post

router.get("/:id", async (req, res) => {
   const post = await Post.findById(req.params.id); 
   try {
     res.status(200).json(post);
   } catch (err) {
     res.status(500).json(err);
   }
});

// get timeline post

router.get("/timeline/:userId", async (req, res) => {
   try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId: currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({userId: friendId});  
      })  
    )  
     res.status(200).json(userPosts.concat(...friendPosts));
   } catch (err) {
       res.status(500).json(err);
   }
});

// Get user posts

router.get("/profile/:userName", async (req, res) => {
  try {
   const user = await User.findOne({userName: req.params.userName}); 
   const posts = await Post.find({userId: user._id});
   res.status(200).json(posts);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;