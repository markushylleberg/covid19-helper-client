import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import './Comment.css';
import Moment from 'react-moment';

const Comment = (props) => {
  return (
    <div className="comment">
      <p className="comment-time">
        <Moment fromNow>{props.data.created_at}</Moment>
      </p>
      <p className="comment-user">
        <FaUserAlt /> {props.data.first_name} {props.data.last_name}{' '}
        <span>
          {props.data.code ? (
            <img src={require('../images/flags/' + props.data.code + '.png')} />
          ) : (
            <></>
          )}
        </span>
      </p>
      <p>{props.data.content}</p>
    </div>
  );
};

export default Comment;
