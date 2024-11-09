import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserEdit, FaCog, FaSignOutAlt, FaSave } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Alice Smith", // Replace with real user data
    email: "alice.smith@example.com",
    profilePicture: "https://via.placeholder.com/150", // Replace with actual image URL if available
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleSaveChanges = () => {
    setUser({
      ...user,
      name: editedName,
      email: editedEmail,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center py-10 text-gray-200">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-xl font-semibold mb-2 text-center bg-gray-700 text-gray-200 rounded-md px-2 py-1 w-full"
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="text-gray-400 mb-2 text-center bg-gray-700 rounded-md px-2 py-1 w-full"
            />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {isEditing ? (
            <button
              onClick={handleSaveChanges}
              className="flex w-full items-center justify-center px-4 py-2 bg-green-500 text-gray-900 rounded-lg hover:bg-green-400 transition-all"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex w-full items-center justify-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all"
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          )}

          <Link
            to="/setting"
            className="flex w-full items-center justify-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
          >
            <FaCog className="mr-2" /> Settings
          </Link>

          <Link
            to="/"
            className="flex w-full items-center justify-center px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all"
          >
            <FaSignOutAlt className="mr-2" /> Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
