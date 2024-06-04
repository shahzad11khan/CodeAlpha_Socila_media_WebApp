import React from "react";
import Like from "./Like";
import Comment from "./Comment";

function Post({ post }) {
  console.log(post.comments);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-3/6">
      <h2 className="text-2xl font-bold mb-4">{post.text}</h2>
      <Like postId={post._id} />
      <Comment key={post._id} comment={post} />
      <div className="mt-4">
        {post.comments.map((comment, index) => (
          <ul key={index} className="list-disc list-inside">
            <li className="text-gray-700">{comment.text}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Post;
