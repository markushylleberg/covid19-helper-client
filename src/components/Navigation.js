import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Logout from './Logout';
import SignupPage from '../pages/SignupPage';
import ProfilePage from '../pages/ProfilePage';
import ThreadsPage from '../pages/ThreadsPage';
import ThreadSinglePage from '../pages/ThreadSinglePage';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import RequestNewPasswordPage from '../pages/RequestNewPasswordPage';
import ConfirmNewPasswordPage from '../pages/ConfirmNewPasswordPage';

import './Navigation.css';

const Navigation = ({ userInfo }) => {
  return (
    <Router>
      <>
        {userInfo ? (
          <nav>
            <div className="nav-wrapper">
              <div className="logo-container">
                <p>
                  Covid-19<span>HELPER</span>
                </p>
              </div>
              <div>
                <NavLink to="/profile" activeClassName="active-nav">
                  My profile
                </NavLink>
                <NavLink to="/tipsandtricks" activeClassName="active-nav">
                  Tips and tricks
                </NavLink>
                <NavLink to="/accountsettings" activeClassName="active-nav">
                  Account settings
                </NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </div>
            </div>
          </nav>
        ) : (
          <nav>
            <div className="nav-wrapper">
              <div className="logo-container">
                <p>
                  Covid-19<span>HELPER</span>
                </p>
              </div>
              <div>
                <NavLink to="/tipsandtricks" activeClassName="active-nav">
                  Tips and tricks
                </NavLink>
                <NavLink to="/signup" activeClassName="active-nav">
                  Signup
                </NavLink>

                <NavLink to="/login" activeClassName="active-nav">
                  <button className="btn-nav">Login</button>
                </NavLink>
              </div>
            </div>
          </nav>
        )}
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/tipsandtricks">
            <ThreadsPage user={userInfo} />
          </Route>
          <Route exact path="/tipsandtricks/:id">
            <ThreadSinglePage user={userInfo} />
          </Route>
          <Route exact path="/requestpassword">
            <RequestNewPasswordPage />
          </Route>
          <Route exact path="/confirmnewpassword">
            <ConfirmNewPasswordPage />
          </Route>
          <Route exact path="/accountsettings">
            <AccountSettingsPage user={userInfo} />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default Navigation;
