const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Like = require("../models/Like");

// Like a post /api/likes/
router.post("/:postId", auth, async (req, res) => {
  console.log(req.user.id);
  console.log(req.params.postId);
  try {
    const post = await Post.findById(req.params.postId);
    const like = new Like({
      user: req.user.id,
      post: req.params.postId,
    });

    post.likes.unshift(like);
    await post.save();
    await like.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
