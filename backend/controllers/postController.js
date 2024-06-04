// postController.js
const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assuming you have imported your Post model and have established a connection to your MongoDB database

exports.createPost = async (req, res) => {
  console.log(req.body);
  try {
    // Create a new post instance using the Post model and populate it with data from req.body
    const newPost = new Post({ ...req.body, user: req.user.id });

    // Save the new post to the database
    await newPost.save();

    // If the post is saved successfully, respond with status code 201 (created) and send back the newly created post in the response body
    res.status(201).json(newPost);
  } catch (err) {
    // If there's an error during the save process, catch the error and respond with status code 400 (bad request), sending back a JSON object with a message property containing the error message
    res.status(400).json({ message: err.message });
  }
};

// Additional controller methods for post details, update, delete, etc.
