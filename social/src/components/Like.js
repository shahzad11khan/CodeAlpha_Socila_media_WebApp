import React, { useState } from "react";
import axios from "axios";

function Like({ postId }) {
  console.log(postId);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await axios.post(
        `http://localhost:5000/api/likes/${postId}`,
        {},
        {
          headers: {
            "x-auth-token": token, // Include the token with Bearer prefix
          },
        }
      );
      setLiked(true);
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <button onClick={handleLike} disabled={liked}>
      {liked ? "Liked" : "Like"}
    </button>
  );
}

export default Like;
