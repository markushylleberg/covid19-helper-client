import React, { useState } from 'react';

const RequestNewPasswordPage = () => {
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
    <div className="page-wrapper-padding">
      <h1>Forgot password?</h1>
      <form onSubmit={handleNewPasswordRequest}>
        <div className="input-pair">
          <label>Enter email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button>Send new password</button>
      </form>
    </div>
  );
};

export default RequestNewPasswordPage;
