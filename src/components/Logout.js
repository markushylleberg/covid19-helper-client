import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      await fetch('/user/logout', {
        method: 'GET',
      }).then((res) => {
        if (res.status === 200) {
          window.location.assign('/login');
        }
      });
    };
    handleLogout();
  });

  return <></>;
};

export default Logout;
