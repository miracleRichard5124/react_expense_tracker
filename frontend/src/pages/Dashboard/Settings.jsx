import React, { useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';

const Settings = () => {

  const [activeBar, setActiveBar] = useState('user');
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentpassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <DashboardLayout activeMenu="Settings">
      <div className='w-[100%] flex justify-between gap-3 rounded-lg sticky top-15 left-10 right-10'>
        <button className={`settings-nav-btn ${activeBar === 'user' ? 'border-b-2 border-purple-500 text-purple-500' : ''}`} onClick={() => setActiveBar('user')}>USER</button>
        <button className={`settings-nav-btn ${activeBar === 'account' ? 'border-b-2 border-purple-500 text-purple-500' : ''}`} onClick={() => setActiveBar('account')}>ACCOUNT</button>
      </div>
      <div className="">
        {activeBar === 'user' && (
          <div className="flex">
            <h2 className="p-5 text-lg font-semibold mb-4">User Information</h2>
            
            <ProfilePhotoSelector image={image} setImage={setImage}/>
          </div>

        )}

        {activeBar === 'account' && (
          <div className="flex flex-col">
            <h2 className="p-5 text-lg font-semibold mb-4">Account Settings</h2>
            <div className="mt-6 text-sm text-gray-600">
                <p>Account created: <span className="font-medium">2025-07-29</span></p>
                <p>Last login: <span className="font-medium">2025-08-25</span></p>
              </div>
          </div>

        )}
      </div>
    </DashboardLayout>
  );
}

export default Settings;
