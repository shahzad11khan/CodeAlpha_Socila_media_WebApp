import React, { useState } from "react";
import axios from "axios";

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to create a post.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const body = { text };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        body,
        config
      ); // Notify parent component about the new post
      setText("");
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError("Failed to create post");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form>
        <div className="mb-4">
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
