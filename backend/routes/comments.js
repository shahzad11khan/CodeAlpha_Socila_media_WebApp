const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Add a comment
router.post("/:postId", auth, async (req, res) => {
  console.log(req.params.postId);
  console.log(req.user.id);
  try {
    const post = await Post.findById(req.params.postId);
    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      post: req.params.postId,
    });

    post.comments.unshift(newComment);
    await post.save();
    await newComment.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
