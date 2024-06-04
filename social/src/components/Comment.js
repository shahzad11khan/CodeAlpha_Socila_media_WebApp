import React, { useState } from "react";
import axios from "axios";

function Comment({ comment }) {
  console.log(comment._id);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
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

    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${comment._id}`,
        { text },
        config
      );
      // Handle successful comment submission (optional)
      console.log("Comment submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4 w-1/2">
      {/* <p>{comment}</p> */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Comment
        </button>
      </form>
    </div>
  );
}

export default Comment;
