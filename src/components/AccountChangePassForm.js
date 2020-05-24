import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';

const AccountChangePassForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/accountsettings/changepassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        currentPassword,
        newPassword,
        newPasswordConfirm,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setMessage(response.message);
        setCurrentPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
      });
  };

  return (
    <div className="text-center margin-tb w-60">
      <div className="divider"></div>
      <div className="margin-tb">
        <FaKey />
      </div>
      <h3 className="sub-headline no-mp">Change password</h3>
      <form onSubmit={handlePasswordChange}>
        <div className="input-pair">
          <label>Type current password</label>
          <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
          ></input>
        </div>
        <div className="input-pair">
          <label>Enter new password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
          ></input>
        </div>
        <div className="input-pair">
          <label>Confirm new password</label>
          <input
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            type="password"
          ></input>
        </div>
        <button className="submit-btn">Update</button>
      </form>
      <p className="red">{message ? message : ''}</p>
    </div>
  );
};

export default AccountChangePassForm;
