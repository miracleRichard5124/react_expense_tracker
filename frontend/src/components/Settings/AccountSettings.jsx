import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const AccountSettings = () => {
  const { user, clearUserData } = useContext(UserContext);

  const handleClearData = () => {}

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Account Settings</h2>

      <div className="space-y-2 text-sm text-gray-600">
        <p>
          Account created:{" "}
          <span className="font-medium">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "---"}
          </span>
        </p>
        <p>
          Last login:
          <span className="font-medium">
            {user?.lastLogin
              ? new Date(user.lastLogin).toLocaleDateString()
              : "---"}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          Change Password
        </button>
        <button
          onClick={handleClearData}
          className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
        >
          Clear Data
        </button>
        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
