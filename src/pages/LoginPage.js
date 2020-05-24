import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="page-wrapper-padding login-page-wrapper text-center">
      <LoginForm />
      <p>
        Forgot password?{' '}
        <a href="/requestpassword">Click here to reset password</a>
      </p>
    </div>
  );
};

export default LoginPage;
