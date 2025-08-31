import React, { useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import SettingsNavbar from '../../components/Settings/SettingsNavbar';
import UserSettings from '../../components/Settings/UserSettings';
import AccountSettings from '../../components/Settings/AccountSettings';

const Settings = () => {

  const [activeBar, setActiveBar] = useState('user');
  const [image, setImage] = useState(null);

  return (
    <DashboardLayout activeMenu="Settings">
      <SettingsNavbar activeBar={activeBar} setActiveBar={setActiveBar}/>
      <div className="">
        {activeBar === 'user' && (
          <UserSettings image={image} setImage={setImage}/>
        )}

        {activeBar === 'account' && (
          <AccountSettings/>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Settings;
