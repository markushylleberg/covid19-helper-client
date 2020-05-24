import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

import './ThreadForm.css';

const ThreadForm = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleThreadPost = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/thread', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => {
      if (res.status === 200) {
        if (props.user === undefined) {
          props.handleThreadPost({
            title,
            body,
          });
        } else {
          props.handleThreadPost({
            title,
            body,
            firstName: props.user.first_name,
            lastName: props.user.last_name,
          });
        }
      }
    });
  };

  return (
    <div class="thread-form-container w-60">
      <FaPaperPlane />
      <h3>Start a new thread </h3>
      <form onSubmit={handleThreadPost}>
        <div className="input-pair">
          <label>
            Title<span> Give your thread a title</span>
          </label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="text-pair">
          <label>
            Text<span> Describe your tip in detail</span>
          </label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            rows="4"
            cols="100"
          ></textarea>
        </div>
        <button className="submit-btn">Create new thread</button>
      </form>
    </div>
  );
};

export default ThreadForm;
