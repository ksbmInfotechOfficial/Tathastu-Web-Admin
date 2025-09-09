import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white px-4">
      <div className="max-w-lg text-center p-8 bg-white shadow-lg rounded-lg border border-blue-100">
        <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
