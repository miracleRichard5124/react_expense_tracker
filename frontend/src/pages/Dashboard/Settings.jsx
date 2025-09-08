import React, { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import UserSettings from "../../components/Settings/UserSettings";
import AccountSettings from "../../components/Settings/AccountSettings";

const Settings = () => {
  const [image, setImage] = useState(null);

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="mx-auto fade-in">
        <h2 className="text-2xl mb-5 text-purple-500 card">Settings</h2>
        <div className="space-y-10 fade-in">
          <UserSettings image={image} setImage={setImage} />
          <AccountSettings />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
