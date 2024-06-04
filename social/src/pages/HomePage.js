// Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import CreatePost from "./Post";
import Comment from "../components/Comment";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">Home Page</h1>
      <CreatePost />
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <>
            <Post key={post._id} post={post} />
          </>
        ))}
      </div>
    </div>
  );
}

export default Home;
