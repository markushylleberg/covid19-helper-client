import React from 'react';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();
  return (
    <div className="page-wrapper-padding login-page-wrapper text-center">
      <LoginForm />
      <p>
        Forgot password?{' '}
        <span
          className="text-link"
          onClick={() => history.push('/requestpassword')}
        >
          Click here to reset password
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
