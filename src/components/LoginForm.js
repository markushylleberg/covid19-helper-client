import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9090/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          window.location.assign('/tipsandtricks');
        } else {
          return res.json();
        }
      })
      .then((response) => {
        setMessage(response.message);
      });
  };

  return (
    <div className="text-center w-60">
      <h1 className="headline text-center">Login form</h1>
      <p className="small-text w-60 margin-3">
        Welcome to COVID-19 Helper! This is a place where you can get the latest
        numbers on the pandemic - and where to can also chat with other people
        and discuss the situation and share you best motivational advice and
        everyday tips!
      </p>
      <form onSubmit={handleLogin}>
        <div className="input-pair">
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-pair">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn">Login</button>
        <p className="red">{message !== '' ? message : ''}</p>
      </form>
    </div>
  );
};

export default LoginForm;
