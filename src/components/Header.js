// src/components/Header.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../redux/slices/userSlice';
// import { FaPowerOff, FaBars, FaTimes } from 'react-icons/fa'; // Import the logout icon
// import { toggleSidebar } from '../redux/slices/sidebarSlice';


// const Header = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   return (
//     <header className="bg-gradient-to-r from-[#101820] to-[#FEE715] text-white shadow-md py-4 px-8 flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => dispatch(toggleSidebar())}
//           className="p-2 bg-[#101820] text-white rounded-full hover:bg-[#FEE715] hover:text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#101820] transition-all duration-300"
//         >
//           {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//         </button>
//         <h2 className="text-3xl font-semibold tracking-wide text-gray-100">
//           Dashboard
//         </h2>
//       </div>

//       <button
//         className="flex items-center space-x-2 bg-[#101820] text-white py-2 px-4 rounded-full hover:bg-[#FEE715] hover:text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#101820] transition-all duration-300"
//         onClick={handleLogout}
//       >
//         <FaPowerOff className="text-lg" />
//         <span className="text-sm font-medium">Logout</span>
//       </button>
//     </header>
//   );
// };


// export default Header;



// src/components/Header.js
// src/components/Header.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../redux/slices/userSlice';
// import { FaPowerOff, FaBars, FaTimes } from 'react-icons/fa'; // Import icons
// import { toggleSidebar } from '../redux/slices/sidebarSlice';

// const Header = () => {
//   const dispatch = useDispatch();
//   const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   return (
//     <header className="bg-gradient-to-r  text-white shadow-md py-4 px-8 flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => dispatch(toggleSidebar())}
//           className="p-2 bg-[#1E3A8A] text-white rounded-full hover:bg-[#60A5FA] hover:text-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all duration-300"
//         >
//           {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//         </button>
//         <h2 className="text-3xl font-semibold tracking-wide text-white">
//           Dashboard
//         </h2>
//       </div>

//       <button
//         className="flex items-center space-x-2 bg-[#1E3A8A] text-white py-2 px-4 rounded-full hover:bg-[#60A5FA] hover:text-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all duration-300"
//         onClick={handleLogout}
//       >
//         <FaPowerOff className="text-lg" />
//         <span className="text-sm font-medium">Logout</span>
//       </button>
//     </header>
//   );
// };

// export default Header;



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../redux/slices/adminSlice';  // Import the logout action
import { FaPowerOff, FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import { toggleSidebar } from '../redux/slices/sidebarSlice';
import { toast } from 'react-toastify';
const Header = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  const handleLogout = () => {
    // Dispatch logout action to clear Redux state and localStorage
    dispatch(logoutAdmin());
    toast.success("Logged out successfully!");
  };

  return (
    <header className="bg-gradient-to-r  text-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 bg-[#C2410C] text-white rounded-full hover:bg-[#9A3412] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all duration-300"
        >
          {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
        {/* <h2 className="text-3xl font-semibold tracking-wide text-white">Dashboard</h2> */}
      </div>

      <button
        className="flex items-center space-x-2 bg-[#C2410C] text-white py-2 px-4 rounded-full hover:bg-[#9A3412] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all duration-300"
        onClick={handleLogout}
      >
        <FaPowerOff className="text-lg" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </header>
  );
};

export default Header;


