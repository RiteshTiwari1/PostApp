// PostCard.js
import React from 'react';

const PostCard = ({ post, onRemove }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <img src={post.imageUrl} alt="Post" /> {/* Add image here */}
      <p>{post.body}</p>
      <button onClick={() => onRemove(post.id)}>Remove</button>
    </div>
  );
};

export default PostCard;
