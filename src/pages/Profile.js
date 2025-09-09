// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Example of accessing user data from Redux or local state
  const user = useSelector((state) => state.auth.user); // You can replace this with your actual user data in state

  // Local state for profile update form
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action to update Redux state
    navigate('/login'); // Redirect to login page after logout
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Logic to update profile data, you can connect to an API or update Redux state here
    console.log('Profile updated:', { username, email });
  };

  return (
    <div className="profile-container max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      <p className="mt-4 text-lg text-gray-600">Update your profile information below:</p>

      {/* Profile Form */}
      <form className="mt-6" onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
