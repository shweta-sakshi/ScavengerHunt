import React, { useState } from "react";
import { FaMoon, FaBell, FaLock } from "react-icons/fa";
import NavGame from "./NavGame";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Additional logic to apply dark mode can be added here
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmNewPassword) {
      console.log("Password changed successfully"); // Placeholder for actual password change logic
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <>
      <NavGame />
      <div className="bg-gray-900 min-h-screen text-gray-200 py-10 px-6">
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaMoon className="text-yellow-500 mr-2" />
              <span>Dark Mode</span>
            </div>
            <button
              onClick={handleToggleDarkMode}
              className={`px-4 py-2 rounded-lg font-medium ${isDarkMode ? "bg-yellow-500 text-gray-900" : "bg-gray-700"
                } hover:bg-gray-600 transition-all`}
            >
              {isDarkMode ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaBell className="text-yellow-500 mr-2" />
              <span>Notifications</span>
            </div>
            <button
              onClick={handleToggleNotifications}
              className={`px-4 py-2 rounded-lg font-medium ${notificationsEnabled
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700"
                } hover:bg-gray-600 transition-all`}
            >
              {notificationsEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Password Change Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="w-full bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-all"
            >
              Save New Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
