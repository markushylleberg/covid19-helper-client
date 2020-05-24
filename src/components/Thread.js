import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaUser, FaCommentAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';

import './Thread.css';

const Thread = (props) => {
  const history = useHistory();
  const canUserLike = props.user === undefined ? false : true;
  const [likeCount, setLikeCount] = useState(Number(props.data.like_count));
  const [isThreadLiked, setIsThreadLiked] = useState(props.liked);

  const handleThreadLike = async (id) => {
    setIsThreadLiked(!isThreadLiked);
    if (isThreadLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    await fetch('http://localhost:9090/thread/like', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      credentials: 'include',
      body: JSON.stringify({
        threadId: id,
      }),
    });
  };

  return (
    <>
      <div id={props.data.id} className="thread">
        <p
          onClick={() => history.push(`/tipsandtricks/${props.data.id}`)}
          className="thread-created-at"
        >
          <Moment fromNow ago>
            {props.data.created_at}
          </Moment>{' '}
          ago
        </p>
        <div className="thread-title">
          <h3 onClick={() => history.push(`/tipsandtricks/${props.data.id}`)}>
            {props.data.title}{' '}
          </h3>
          <div>
            {canUserLike ? (
              [
                isThreadLiked ? (
                  <button onClick={() => handleThreadLike(props.data.id)}>
                    <FaHeart />
                  </button>
                ) : (
                  <button onClick={() => handleThreadLike(props.data.id)}>
                    <FaRegHeart />
                  </button>
                ),
              ]
            ) : (
              <p className="small-text">
                You need to login before you can like threads.
              </p>
            )}
          </div>
        </div>
        <p
          onClick={() => history.push(`/tipsandtricks/${props.data.id}`)}
          className="thread-user"
        >
          <FaUser /> {props.data.first_name} {props.data.last_name}
          <span>
            <img src={require('../images/flags/' + props.data.code + '.png')} />
          </span>
        </p>
        <div
          onClick={() => history.push(`/tipsandtricks/${props.data.id}`)}
          className="thread-body"
        >
          <p>{props.data.body}</p>
        </div>
        <div
          onClick={() => history.push(`/tipsandtricks/${props.data.id}`)}
          className="thread-numbers"
        >
          <p>
            <span>
              <FaHeart />
            </span>{' '}
            {likeCount}
          </p>
          <p>
            <span>
              <FaCommentAlt />
            </span>{' '}
            {props.data.comment_count}
          </p>
        </div>
      </div>
    </>
  );
};

export default Thread;
