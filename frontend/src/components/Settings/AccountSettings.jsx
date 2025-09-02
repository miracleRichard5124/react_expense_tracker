import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Modal from "../Modal";
import DeleteAlert from "../DeleteAlert";

const AccountSettings = () => {
  const { user, clearUser } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleClearData = () => {
    localStorage.clear();
    clearUser();
    console.log("User Data Cleared");
    setModalOpen(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account Deleted");
    localStorage.clear();
    clearUser();
    setModalOpen(false);
  };

  const openModal = (action) => {
    setModalAction(action);
    setModalOpen(true);
  }

  return (
    <div className="card space-y-6">
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
          onClick={() => openModal('clear')}
          className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
        >
          Clear Data
        </button>
        <button 
          onClick={() => openModal('delete')} 
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
        >
          Delete Account
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalAction === "delete" ? "Delete Account" : "Clear Data"}
      >
        <DeleteAlert
          content={
            modalAction === "delete"
              ? "Are you sure you want to delete your account? This cannot be undone."
              : "Are you sure you want to clear your data? This action cannot be undone."
          }
          onDelete={
            modalAction === "delete" ? handleDeleteAccount : handleClearData
          }
          buttonLabel={modalAction === "delete" ? "Delete" : "Clear"}
          btnColor={modalAction === "delete" ? 'delete-btn' : 'clear-btn'}
        />
      </Modal>
    </div>
  );
};

export default AccountSettings;
