import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import { FaUser, FaHeart, FaCommentAlt, FaChevronLeft } from 'react-icons/fa';

import './ThreadSinglePage.css';

const ThreadSinglePage = (userInfo) => {
  const history = useHistory();

  const params = useParams();
  const [thread, setThread] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState('');

  useEffect(() => {
    const fetchSingleThread = async () => {
      await fetch(`http://localhost:9090/thread/${params.id}`, {
        method: 'GET',
        headers: { 'Content-type': 'Application/json' },
      })
        .then((res) => res.json())
        .then((response) => {
          setThread(response.thread[0]);
          setComments(response.comments);
          setCommentCount(Number(response.thread[0].comment_count));
        });
    };
    fetchSingleThread();
  }, [setThread, setComments]);

  const handleCommentPost = (id, comment, code, first, last) => {
    setComments((prevComments) => [
      ...prevComments,
      {
        id,
        content: comment,
        created_at: Date.now(),
        code: code,
        first_name: first,
        last_name: last,
      },
    ]);
    setCommentCount(commentCount + 1);
  };

  return (
    <div className="page-wrapper-padding single-thread">
      <button
        className="back-arrow"
        onClick={() => history.push(`/tipsandtricks`)}
      >
        <FaChevronLeft />
      </button>
      <div className="single-thread-container">
        <p className="thread-created-at">
          <Moment fromNow ago>
            {thread.created_at}
          </Moment>{' '}
          ago
        </p>
        <p className="single-thread-starter">
          <FaUser /> {thread.first_name} {thread.last_name}
          {thread.code ? (
            <span>
              <img src={require('../images/flags/' + thread.code + '.png')} />
            </span>
          ) : (
            <></>
          )}
        </p>
        <div className="thread-single-body">
          <h1>{thread.title}</h1>
          <p>{thread.body}</p>
        </div>

        <div className="thread-numbers">
          <p>
            <span>
              <FaHeart />
            </span>{' '}
            {thread.like_count}
          </p>
          <p>
            <span>
              <FaCommentAlt />
            </span>{' '}
            {commentCount}
          </p>
        </div>
      </div>

      <div className="single-thread-comment-section">
        {comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
      </div>
      <CommentForm
        handleCommentPost={handleCommentPost}
        threadId={thread.id}
        userInfo={userInfo}
      />
    </div>
  );
};

export default ThreadSinglePage;
