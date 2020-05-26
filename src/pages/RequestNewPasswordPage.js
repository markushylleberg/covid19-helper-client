import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RequestNewPasswordPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleNewPasswordRequest = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/newpasswordrequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        window.location.assign('/confirmnewpassword');
      }
    });
  };

  return (
    <div className="page-wrapper-padding w-60 text-center">
      <h1 className="text-center headline">Forgot password?</h1>
      <form onSubmit={handleNewPasswordRequest}>
        <div className="input-pair">
          <label>Enter email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="submit-btn">Send new password</button>
      </form>
      <p className="text-link" onClick={() => history.push('/login')}>
        Go back to login
      </p>
    </div>
  );
};

export default RequestNewPasswordPage;
