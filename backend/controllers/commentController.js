// commentController.js
const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({ ...req.body, user: req.user.id });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Additional controller methods for comment details, update, delete, etc.
