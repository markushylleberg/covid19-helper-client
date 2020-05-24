import React, { useState, useEffect } from 'react';

import './CommentForm.css';

const CommentForm = (props) => {
  const initialState = '';
  const [comment, setComment] = useState(initialState);
  const canUserComment = props.userInfo.user === undefined ? false : true;

  const handleCommentPost = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/thread/comment', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      credentials: 'include',
      body: JSON.stringify({
        threadId: props.threadId,
        comment,
      }),
    }).then((res) => {
      if (res.status === 200) {
        console.log(props.userInfo.user);
        props.handleCommentPost(
          props.userInfo.user.id,
          comment,
          props.userInfo.user.code,
          props.userInfo.user.first_name,
          props.userInfo.user.last_name
        );
      }
    });
  };

  return (
    <div className="comment-form">
      {canUserComment ? (
        <>
          <form onSubmit={handleCommentPost}>
            <div className="text-pair">
              <label>
                Join the conversation <span></span>
              </label>
              <textarea
                placeholder="Write something..."
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                cols="100"
              ></textarea>
            </div>
            <div className="text-center">
              <button className="submit-btn">Add comment</button>
            </div>
          </form>
        </>
      ) : (
        <p className="small-text">You need to login before you can comment.</p>
      )}
    </div>
  );
};

export default CommentForm;
