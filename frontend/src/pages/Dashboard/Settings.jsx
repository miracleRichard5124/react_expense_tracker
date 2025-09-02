import React, { useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import UserSettings from '../../components/Settings/UserSettings';
import AccountSettings from '../../components/Settings/AccountSettings';

const Settings = () => {
  const [image, setImage] = useState(null);

  return (
    <DashboardLayout activeMenu="Settings">
      <h2 className='text-3xl mb-5 text-purple-500 card'>Settings</h2>
      <div className="space-y-10">
        <UserSettings image={image} setImage={setImage} />
        <hr className='border-b border-gray-300 my-6'/>
        <AccountSettings />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
