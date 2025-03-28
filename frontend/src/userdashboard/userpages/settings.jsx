import React from 'react';
 // If you are using react-router for navigation
 import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate=useNavigate();
 

  // Handle Logout action
  const handleLogout = () => {
    // Clear user session (e.g., remove JWT or user data from localStorage)
    localStorage.removeItem('useremail'); 
    localStorage.removeItem('jtoken')// Assuming you store the user's email or token in localStorage
    // Redirect to login page after logout
    navigate('/login'); // Replace '/login' with the actual route path for login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-96 w-[90%] ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Account Settings</label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="text-sm text-gray-600">Manage your account settings here.</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Notifications</label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="text-sm text-gray-600">Set your notification preferences.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Privacy Settings</label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="text-sm text-gray-600">Control your privacy settings here.</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
