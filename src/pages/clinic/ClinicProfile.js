// import React from 'react';
// import { useSelector } from 'react-redux';
// import {
//   FaClinicMedical,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaUserShield,
//   FaUserTag,
// } from 'react-icons/fa';
// import SubscriptionGuard from '../../components/SubscriptionGuard';
// import { useNavigate } from 'react-router-dom';

// const clinicData = {
//   name: 'CareWell Clinic',
//   address: '123 Health St, Ghaziabad, UP',
//   contact: '+91 123 456 7890',
//   email: 'contact@carewellclinic.com',
//   website: 'www.carewellclinic.com',
//   description:
//     'CareWell Clinic is a multi-specialty medical center offering expert care, advanced diagnostics, and personalized treatment in a welcoming environment.',
// };



// const InfoCard = ({ icon: Icon, label, value }) => (
//   <div className="flex items-start gap-3 mb-4">
//     <div className="text-indigo-500 text-lg mt-1">
//       <Icon />
//     </div>
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-sm font-medium text-gray-800">{value}</p>
//     </div>
//   </div>
// );

// const ClinicProfile = () => {
  
//   const admin = useSelector((state) => state.admin?.admin?.user);
//   const navigate = useNavigate()
//   return (
   
//     <div className="min-h-screen bg-[#F7FBFF] px-4 py-8">
//       <div className=" mx-auto bg-white shadow-md rounded-xl px-6 py-8 sm:px-8 sm:py-10">
//         {/* Admin Info */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Welcome, {admin?.fullName}</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Role: <span className="capitalize">{admin?.role}</span> | Email: {admin?.email}
//             </p>
//           </div>
//           <div className="mt-3 md:mt-0 flex items-center gap-4 text-sm">
//             <div className="flex items-center gap-1 text-indigo-600">
//               <FaUserShield />
//               <span>{admin?.fullName}</span>
//             </div>
//             <div className="flex items-center gap-1 text-gray-600">
//               <FaUserTag />
//               <span className="capitalize">{admin?.role}</span>
//             </div>
//           </div>
//         </div>

//         {/* Clinic Info Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">Clinic Profile</h2>
//           <p className="text-sm text-gray-500 mt-1">Your clinic's basic information</p>
//         </div>

//         {/* Clinic Details */}
//         <div className="bg-[#F7FBFF] rounded-lg p-5 border border-blue-100 mb-6">
//           <div className="flex items-start gap-4 mb-5">
//             <div className="text-indigo-600 text-2xl">
//               <FaClinicMedical />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{clinicData.name}</h3>
//               <p className="text-sm text-gray-600 mt-1">{clinicData.description}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//             <InfoCard icon={FaPhone} label="Contact" value={clinicData.contact} />
//             <InfoCard icon={FaEnvelope} label="Email" value={clinicData.email} />
//             <InfoCard icon={FaMapMarkerAlt} label="Address" value={clinicData.address} />
//             <InfoCard icon={FaGlobe} label="Website" value={clinicData.website} />
//           </div>
//         </div>

//         {/* Edit Button */}
//         <div className="text-center">
//           <button onClick={()=> navigate('/profile_update')} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-md font-medium shadow-sm transition">
//             Edit Clinic Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClinicProfile;




import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaClinicMedical, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaUserShield, FaUserTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// InfoCard component for reusable UI
const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 mb-4">
    <div className="text-indigo-500 text-lg mt-1">
      <Icon />
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

const ClinicProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState(null); // State to store doctor data
  const admin = useSelector((state) => state.admin?.admin?.user); // Admin data from Redux store
  const token = useSelector((state) => state.admin?.token); // Token from Redux store
  const navigate = useNavigate();

  const doctorId = useSelector((state) => state.admin?.admin?.user?.id); // Get doctorId from Redux store

  // Fetch doctor details on component mount
  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://194.238.17.230:8001/api/admin/get_doctor/${doctorId}`, { headers });
        setDoctorDetails(response.data); // Assuming the API returns the doctor's profile details
      } catch (error) {
        console.error("Error fetching doctor's details", error);
      }
    };

    if (doctorId && token) {
      fetchDoctorDetails(); // Fetch doctor details if doctorId and token exist
    }
  }, [doctorId, token]);

  // If data is still loading, show a loading indicator
  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7FBFF] px-4 py-8">
      <div className=" mx-auto bg-white shadow-md rounded-xl px-6 py-8 sm:px-8 sm:py-10">
        {/* Admin Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {doctorDetails?.fullName}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Role: <span className="capitalize">{admin?.role}</span> | Email: {doctorDetails?.email}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-indigo-600">
              <FaUserShield />
              <span>{doctorDetails?.fullName}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <FaUserTag />
              <span className="capitalize">{admin?.role}</span>
            </div>
          </div>
        </div>

        {/* Clinic Info Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Clinic Profile</h2>
          <p className="text-sm text-gray-500 mt-1">{doctorDetails?.clinicAbout || doctorDetails?.createdBy?.clinicAbout}</p>
        </div>

        {/* Clinic Details */}
        <div className="bg-[#F7FBFF] rounded-lg p-5 border border-blue-100 mb-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="text-indigo-600 text-2xl">
              <FaClinicMedical />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{doctorDetails?.clinicName || doctorDetails?.createdBy?.clinicName}</h3>
              <p className="text-sm text-gray-600 mt-1">{doctorDetails?.clinicAbout || doctorDetails?.createdBy?.clinicAbout}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoCard icon={FaPhone} label="Contact" value={doctorDetails?.clinicContact || doctorDetails?.createdBy?.clinicContact} />
            <InfoCard icon={FaEnvelope} label="Email" value={doctorDetails?.clinicEmail || doctorDetails?.createdBy?.clinicEmail}/>
            <InfoCard icon={FaMapMarkerAlt} label="Address" value={doctorDetails?.clinicAddress || doctorDetails?.createdBy?.clinicAddress} />
            <InfoCard icon={FaGlobe} label="Website" value={doctorDetails?.clinicWebsite || 'www.example.com'} />
          </div>
        </div>

        {/* Edit Button */}
        {localStorage.getItem('role') == 'doctorAdmin' && 
        <div className="text-center">
          <button onClick={() => navigate('/profile_update')} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-md font-medium shadow-sm transition">
            Edit Clinic Profile
          </button>
        </div>
}
      </div>
    </div>
  );
};

export default ClinicProfile;

