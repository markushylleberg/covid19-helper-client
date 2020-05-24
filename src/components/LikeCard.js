import React from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

import './LikeCard.css';

const LikeCard = (props) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/tipsandtricks/${props.thread.id}`)}
      className="like-card"
    >
      <p>
        <Moment fromNow>{props.thread.created_at}</Moment>
      </p>
      <h1 className="sub-headline">{props.thread.title}</h1>
      <div className="like-card-body">
        <p>{props.thread.body}</p>
      </div>
    </div>
  );
};

export default LikeCard;
