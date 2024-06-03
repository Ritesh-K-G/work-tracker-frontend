import React from 'react';
import './comments.css';

const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(date);
    return `${formattedTime} ${formattedDate}`;
};

const CommentList = ({ comments }) => {
  return (
    <div className="comment-container">
        <p>
            Comments:
        </p>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <span className="commentator">👤 {comment.commentatorName}</span>
          <p className="comment-text">{comment.comment}</p>
          <span className="comment-time">{formatDateTime(comment.time)}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
