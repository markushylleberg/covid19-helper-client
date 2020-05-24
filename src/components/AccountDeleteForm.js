import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const AccountDeleteForm = () => {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleAccountDelete = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/accountsettings/deleteaccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        deleteMessage,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.assign('/login');
        }
        return res.json();
      })
      .then((response) => {
        setMessage(response.message);
      });
  };

  return (
    <div className="text-center margin-tb w-60">
      <div className="divider"></div>
      <div className="margin-tb">
        <FaTrash />
      </div>
      <h3 className="sub-headline no-mp">DELETE</h3>
      <form onSubmit={handleAccountDelete}>
        <div className="input-pair">
          <label>
            Type <u>delete</u> to confirm
          </label>
          <input
            type="text"
            onChange={(e) => setDeleteMessage(e.target.value)}
          />
        </div>
        <button className="delete-btn">Delete</button>
      </form>
      <p className="red">{message ? message : ''}</p>
    </div>
  );
};

export default AccountDeleteForm;
