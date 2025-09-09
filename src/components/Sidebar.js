// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { FaHome, FaUser, FaCog, FaSignOutAlt, FaStethoscope, FaUserInjured, FaCreditCard, FaExchangeAlt, FaGem } from 'react-icons/fa';
// import SidebarItem from './SidebarItem';
// import { logoutAdmin } from '../redux/slices/adminSlice';

// const Sidebar = () => {
//   const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   const role = useSelector((state) => state.admin?.admin?.user?.role);
//   console.log("ROLEEEEEE", role)
//   const dispatch = useDispatch();
  
//    const handleLogout = () => {
//     dispatch(logoutAdmin());
//     localStorage.removeItem('token'); // optional, in case you store it
//     // navigate('/admin/login');
//   };
  

//   return (
//     <div
//       className={`${isSidebarOpen ? 'w-64' : 'w-20'
//         } bg-gradient-to-r  text-gray-500 min-h-screen p-4 transition-all duration-300 shadow-md`}
//     >
//       <h1
//         className={`text-xl font-bold mb-6 text-blue-800 transition-all duration-300 `}
//       >
//         <img
//           src="/images/medical_logo.png"
//           alt="Medical Assistant Logo"
//           className="h-16 w-auto"
//         />
//       </h1>


//       <ul className="space-y-3">
//         <SidebarItem
//           to="/"
//           icon={FaHome}
//           label="Home"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//         />

//         <SidebarItem
//           to="/doctors"
//           icon={FaStethoscope}
//           label="Doctors"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//           children={[
//             { to: '/doctors', label: 'Doctors', icon: FaStethoscope },
//             { to: '/users/patients', label: 'Patients', icon: FaUserInjured },
//           ]}
//         />



//         <SidebarItem
//           to="/patients"
//           icon={FaUserInjured}
//           label="Patients"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//           children={[
//             { to: '/patients', label: 'Patients', icon: FaUserInjured },
//           ]}
//         />

//         <SidebarItem
//           to="/plan"
//           icon={FaGem}
//           label="Plans"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//           children={[
//             { to: '/plan', label: 'Plan', icon: FaCreditCard },
//             // { to: '/plan/premium', label: 'Premium Plan', icon: FaCreditCard },
//           ]}
//         />

//         <SidebarItem
//           to="/Transaction"
//           icon={FaExchangeAlt}
//           label="Transaction"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//         />

//         <SidebarItem
//           to="#"
//           icon={FaSignOutAlt}
//           label="Logout"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//           onClick={handleLogout}
//         />
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;




// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import {
//   FaHome, FaUser, FaCog, FaSignOutAlt, FaStethoscope,
//   FaUserInjured, FaCreditCard, FaExchangeAlt, FaGem
// } from 'react-icons/fa';
// import SidebarItem from './SidebarItem';
// import { logoutAdmin } from '../redux/slices/adminSlice';

// const Sidebar = () => {
//   const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
//   const location = useLocation();
//   const role = useSelector((state) => state.admin?.admin?.user?.role);
  
//   const dispatch = useDispatch();

//   const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     dispatch(logoutAdmin());
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('admin');
//   };

//   const baseClass = `${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-r text-gray-500 min-h-screen p-4 transition-all duration-300 shadow-md flex flex-col justify-between`;

//   const superAdminItems = [
//     {
//       to: '/doctors',
//       label: 'Doctors',
//       icon: FaStethoscope,
//       children: [
//         { to: '/doctors', label: 'Doctors', icon: FaStethoscope },
//         { to: '/users/patients', label: 'Patients', icon: FaUserInjured },
//       ],
//     },
//     { to: '/plan', label: 'Plans', icon: FaGem },
//     { to: '/transaction', label: 'Transaction', icon: FaExchangeAlt },
//   ];

//   const doctorAdminItems = [
//     { to: '/plan_purchase', label: 'Plans', icon: FaGem },
//     { to: '/clinic_profile', label: 'Clinic', icon: FaHome },
//     { to: '/slots', label: 'Slots', icon: FaCog },
//     { to: '/doctors', label: 'Team Doctors', icon: FaStethoscope },
//     { to: '/booking', label: 'Bookings', icon: FaUserInjured },
//   ];

//   const teamDoctorItems = [
//     { to: '/my-schedule', label: 'My Schedule', icon: FaStethoscope },
//     { to: '/appointments', label: 'Appointments', icon: FaUserInjured },
//   ];

//   let roleSpecificItems = [];
//   if (role === 'superAdmin') roleSpecificItems = superAdminItems;
//   else if (role === 'doctorAdmin') roleSpecificItems = doctorAdminItems;
//   else if (role === 'teamDoctor') roleSpecificItems = teamDoctorItems;

//   return (
//     <div className={baseClass}>
//       {/* Logo */}
//       <div>
//         <h1 className="text-xl font-bold mb-6 text-blue-800">
//           <img src="/images/medical_logo.png" alt="Medical Assistant Logo" className="h-16 w-auto" />
//         </h1>

//         {/* Top Menu */}
//         <ul className="space-y-3">
//           <SidebarItem
//             to="/"
//             icon={FaHome}
//             label="Dashboard"
//             isSidebarOpen={isSidebarOpen}
//             isActive={isActive}
//           />

//           {roleSpecificItems.map((item, index) => (
//             <SidebarItem
//               key={index}
//               to={item.to}
//               icon={item.icon}
//               label={item.label}
//               isSidebarOpen={isSidebarOpen}
//               isActive={isActive}
//               children={item.children}
//             />
//           ))}
//         </ul>
//       </div>

//       {/* Sticky Logout */}
//       <ul className="pt-6">
//         <SidebarItem
//           to="#"
//           icon={FaSignOutAlt}
//           label="Logout"
//           isSidebarOpen={isSidebarOpen}
//           isActive={isActive}
//           onClick={handleLogout}
//         />
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;




import React,{ useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  FaHome, FaUser,FaAward,FaFileInvoiceDollar , FaCog, FaSignOutAlt, FaStethoscope,FaDiagnoses, FaUserCog ,FaTachometerAlt ,
  FaUserInjured, FaExchangeAlt, FaGem, FaLock, FaCalendarAlt, FaCalendarCheck,FaCalendarPlus, FaBook, FaMoneyCheckAlt,FaBell
} from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import { logoutAdmin } from '../redux/slices/adminSlice';
import axios from 'axios';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const [doctorDetails, setDoctorDetails] = useState(null); 
  const location = useLocation();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.admin?.admin?.role);
  // const subscription = useSelector((state) => state.admin?.admin?.user?.subscription);
  const isSubscribed = doctorDetails?.subscription?.isActive === true;

  //APII
 const token = useSelector((state) => state.admin?.token); // Token from Redux store
  const doctorId = useSelector((state) => state.admin?.admin?.user?.id); // Get doctorId from Redux store
  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://194.238.17.230:8001/api/admin/get_doctor/${doctorId}`, { headers });
        setDoctorDetails(response.data);
      } catch (error) {
        console.error("Error fetching doctor's details", error);
      }
    };

    if (doctorId && token) {
      fetchDoctorDetails();
    }
  }, [doctorId, token]);


 //APII

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('admin');
  };

  const baseClass = `${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-r text-gray-500 min-h-screen p-4 transition-all duration-300 shadow-md flex flex-col justify-between`;
  


  const superAdminItems = [
    // {
    //   to: '/doctors',
    //   label: 'Doctors',
    //   icon: FaStethoscope,
    //   children: [
    //     { to: '/doctors', label: 'Doctors', icon: FaStethoscope },
    //     { to: '/users/patients', label: 'Patients', icon: FaUserInjured },
    //   ],
    // },
    { to: '/doctors', label: 'Doctors', icon: FaStethoscope },
    { to: '/patients', label: 'Patients', icon: FaUser },
    { to: '/plan', label: 'Plans', icon: FaGem },
    { to: '/transaction', label: 'Transactions', icon: FaExchangeAlt },
    { to: '/booking', label: 'Bookings', icon: FaCalendarPlus },
  ];

  const doctorAdminItems = [
    { to: '/plan_purchase', label: 'Subscription', icon: FaGem },
    { to: '/clinic_profile', label: 'Profile', icon: FaUserCog  },
    { to: '/slots', label: 'Availability & Slots', icon: FaCalendarAlt },
    { to: '/doctors', label: 'Manage Doctors', icon: FaStethoscope },         
    { to: '/symptoms', label: 'Manage Symptoms', icon: FaDiagnoses  },
    { to: '/booking', label: 'Bookings', icon: FaCalendarPlus },
  ];

  const teamDoctorItems = [
    { to: '/clinic_profile', label: 'Profile', icon: FaUserCog  },
    { to: '/booking', label: 'Bookings', icon: FaCalendarPlus },
  ];

  let roleSpecificItems = [];
  if (role === 'SuperAdmin') roleSpecificItems = superAdminItems;
  else if (role === 'doctorAdmin') roleSpecificItems = doctorAdminItems;
  else if (role === 'teamDoctor') roleSpecificItems = teamDoctorItems;

  return (
    <div className={baseClass}>
      <div>
       <h1 className="text-xl font-bold mb-6 text-blue-800 flex justify-center items-center">
  <img src="/images/logo.png" alt="Medical Assistant Logo" className="h-16 w-auto" />
</h1>


        {/* Top Menu */}
        <ul className="space-y-3">
          <SidebarItem
    to="/"
    icon={FaTachometerAlt}
    label="Dashboard"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

  <SidebarItem
    to="/plan"
    icon={FaGem}
    label="Plan"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

  <SidebarItem
    to="/customers"
    icon={FaUser}
    label="Customers"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

  <SidebarItem
    to="/booking"
    icon={FaBook}
    label="Bookings"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

   <SidebarItem
    to="/scheduled_sessions"
    icon={FaBook}
    label="Scheduled Sessions"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

  <SidebarItem
    to="/elite_requests"
    icon={FaAward}
    label="Super Elite Requests"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

  <SidebarItem
    to="/master_otp"
    icon={FaAward}
    label="Master OTP"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

   <SidebarItem
    to="/purchase_history"
    icon={FaFileInvoiceDollar }
    label="Purchase History"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  />

  {/* <SidebarItem
    to="/notification"
    icon={FaBell}
    label="Notification"
    isSidebarOpen={isSidebarOpen}
    isActive={isActive}
  /> */}

          {roleSpecificItems.map((item, index) => {
            const isLocked =
              role === 'doctorAdmin' &&
              !isSubscribed &&
              item.to !== '/plan_purchase' &&
              item.to !== '/clinic_profile';

            return (
              <SidebarItem
                key={index}
                to={item.to}
                icon={item.icon}
                label={
                  isLocked ? (
                    <span className="flex items-center gap-2">
                      {item.label}
                      <FaLock className="text-yellow-600" size={12} />
                    </span>
                  ) : (
                    item.label
                  )
                }
                isSidebarOpen={isSidebarOpen}
                isActive={isActive}
                isLocked={isLocked}
                children={item.children}
              />
            );
          })}
        </ul>
      </div>

      {/* Sticky Logout */}
      <ul className="pt-6">
        <SidebarItem
          to="#"
          icon={FaSignOutAlt}
          label="Logout"
          isSidebarOpen={isSidebarOpen}
          isActive={isActive}
          onClick={handleLogout}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
