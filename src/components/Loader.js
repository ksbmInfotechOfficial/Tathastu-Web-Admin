import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        {/* Spinner ring */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-blue-300 border-t-blue-600 animate-spin"></div>
          <img 
            src="/images/medical_logo.png" 
            alt="Loading..." 
            className="w-28 h-28 object-contain rounded-full bg-white p-1 z-10 absolute inset-2"
          />
        </div>

        <p className="text-xl font-semibold text-blue-800 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
