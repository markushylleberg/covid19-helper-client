import React from 'react';

import AccountSettingsForm from '../components/AccountSettingsForm';
import AccountChangePassForm from '../components/AccountChangePassForm';
import AccountDeleteForm from '../components/AccountDeleteForm';

const AccountSettingsPage = (props) => {
  return (
    <div className="page-wrapper-padding">
      <h1 className="headline text-center">Account settings</h1>
      <AccountSettingsForm user={props.user} />
      <AccountChangePassForm />
      <AccountDeleteForm />
    </div>
  );
};

export default AccountSettingsPage;
