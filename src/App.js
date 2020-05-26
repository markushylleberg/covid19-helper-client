import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState('');

  const LoginRequiredUrls = ['/accountsettings', '/logout'];
  const UserIsAuthIgnoreUrls = ['/login', '/signup'];

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isUserAuthenticated = async () => {
      await fetch('http://localhost:9090/user/auth', {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => {
          if (res.status === 200) {
            UserIsAuthIgnoreUrls.map((url) => {
              if (currentPath === url) {
                window.location.assign('/accountsettings');
              }
            });
          } else {
            LoginRequiredUrls.map((url) => {
              if (currentPath === url) {
                window.location.assign('/login');
              }
            });
          }
          return res.json();
        })
        .then((response) => {
          setUserInfo(response.user);
        });
    };
    isUserAuthenticated();
  }, [setUserInfo]);

  return (
    <div className="App">
      <Navigation userInfo={userInfo} />
    </div>
  );
}

export default App;
