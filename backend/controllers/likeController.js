// likeController.js
const Like = require("../models/Like");

exports.likePost = async (req, res) => {
  try {
    const newLike = await Like.create({
      user: req.user.id,
      post: req.params.postId,
    });
    res.status(201).json(newLike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Additional controller methods for unliking, getting likes count, etc.
