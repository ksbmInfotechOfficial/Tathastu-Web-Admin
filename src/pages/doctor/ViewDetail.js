// import React, { useEffect, useState } from "react";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaClock,
//   FaRupeeSign,
//   FaUserMd,
//   FaUser,
//   FaHospital,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

// const DoctorDetails = () => {
//   const [doctorData, setDoctorData] = useState(null);
//   const navigate = useNavigate();
//  const { id } = useParams();
//   useEffect(() => {
//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://194.238.17.230:8001/api/admin/doctor_team-details/${id}`
//         );
//         const data = await response.json();
//         if (data.success) setDoctorData(data);
//       } catch (error) {
//         console.error("Error fetching doctor details:", error);
//       }
//     };
//     fetchDoctorDetails();
//   }, []);

//   if (!doctorData) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         <div className="animate-pulse space-y-4">
//           <div className="h-6 bg-gray-300 w-1/3 mx-auto rounded"></div>
//           <div className="h-4 bg-gray-200 w-2/3 mx-auto rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   const {
//     adminDoctor: {
//       fullName,
//       email,
//       phone,
//       profilePicture,
//       specialization,
//       qualification,
//       experience,
//       consultationFee,
//       availability,
//       clinicAddress,
//       clinicContact,
//       clinicEmail,
//       clinicName,
//       clinicAbout,
//     },
//     teamDoctors,
//   } = doctorData;

//   const fallbackImage = "/images/defaultProfile.jpg";

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-sm text-blue-700 hover:underline mb-4"
//       >
//         <FaArrowLeft className="mr-1" /> Back to List
//       </button>

//       {/* Admin Doctor */}
//       <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
//         <div className="flex flex-col sm:flex-row items-center gap-6">
//           <img
//             src={profilePicture ? `http://194.238.17.230:8001/${profilePicture}` : fallbackImage}
//             alt="Doctor"
//             className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
//           />
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
//             <div className="flex flex-wrap gap-2 mt-2 text-sm">
//               <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-flex items-center gap-1">
//                 <FaUserMd /> {specialization}
//               </span>
//               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{qualification}</span>
//               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                 {experience} yrs experience
//               </span>
//             </div>
//             <p className="mt-2 flex items-center text-indigo-600 font-medium text-lg">
//               <FaRupeeSign className="mr-1" /> {consultationFee}
//             </p>
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm text-gray-700">
//           <p className="flex items-center gap-2">
//             <FaEnvelope /> {email}
//           </p>
//           <p className="flex items-center gap-2">
//             <FaPhone /> {phone}
//           </p>
//         </div>

//         {/* Availability */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">Availability</h3>
//           <div className="flex flex-wrap gap-2">
//             {availability.map((slot, index) => (
//               <span
//                 key={index}
//                 className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full flex items-center gap-1"
//               >
//                 <FaClock /> {slot.day}: {slot.startTime} - {slot.endTime}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Clinic Info */}
//       <section className="bg-white rounded-lg shadow-lg p-6 mb-10">
//         <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-1">Clinic Information</h3>
//         <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
//           <p className="flex items-center gap-2">
//             <FaHospital /> {clinicName}
//           </p>
//           <p className="flex items-center gap-2">
//             <FaMapMarkerAlt /> {clinicAddress}
//           </p>
//           <p className="flex items-center gap-2">
//             <FaPhone /> {clinicContact}
//           </p>
//           <p className="flex items-center gap-2">
//             <FaEnvelope /> {clinicEmail}
//           </p>
//         </div>
//         <p className="mt-4 text-sm text-gray-600 italic">{clinicAbout}</p>
//       </section>

//       {/* Team Doctors */}
//       <section>
//         <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Team Doctors</h3>
//         {teamDoctors.length > 0 ? (
//           <div className="grid md:grid-cols-2 gap-6">
//             {teamDoctors.map((doc, idx) => (
//               <div key={idx} className="bg-white rounded-lg shadow hover:shadow-md transition p-5">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={doc.profilePicture ? `http://194.238.17.230:8001/${doc.profilePicture}` : fallbackImage}
//                     alt="Team Doctor"
//                     className="w-20 h-20 rounded-full border"
//                   />
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800">{doc.fullName}</h4>
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <FaUserMd /> {doc.specialization}
//                     </p>
//                     <p className="text-sm text-gray-400">Experience: {doc.experience} years</p>
//                     <p className="text-sm text-indigo-600 font-medium flex items-center mt-1">
//                       <FaRupeeSign /> {doc.consultationFee}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Patients */}
//                 <div className="mt-4">
//                   <h5 className="text-sm font-semibold text-gray-700 mb-2">Patients</h5>
//                   {doc.patients && doc.patients.length > 0 ? (
//                     <div className="space-y-2">
//                       {doc.patients.map((patient, pIdx) => (
//                         <div
//                           key={pIdx}
//                           className="text-sm bg-gray-50 p-3 rounded border flex flex-col gap-1"
//                         >
//                           <p><FaUser className="inline mr-1" /> {patient.fullName}</p>
//                           <p><FaPhone className="inline mr-1" /> {patient.mobileNumber}</p>
//                           <p>Age: {patient.age}</p>
//                           <p>Address: {patient.address}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-400">No patients assigned yet.</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No team doctors found.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default DoctorDetails;
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaUserMd,
  FaUser,
  FaHospital,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const DoctorDetails = () => {
  const [doctorData, setDoctorData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          `http://194.238.17.230:8001/api/admin/doctor_team-details/${id}`
        );
        const data = await response.json();
        if (data.success) setDoctorData(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  const fallbackImage = "/images/defaultProfile.jpg";

  if (!doctorData) {
    return (
      <div className="p-10 text-center text-gray-500">
        <div className="animate-pulse space-y-6 max-w-xl mx-auto">
          <div className="h-6 bg-gray-300 w-1/2 rounded mx-auto"></div>
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
        </div>
      </div>
    );
  }

  const {
    adminDoctor: {
      fullName,
      email,
      phone,
      profilePicture,
      specialization,
      qualification,
      experience,
      consultationFee,
      availability,
      clinicAddress,
      clinicContact,
      clinicEmail,
      clinicName,
      clinicAbout,
    },
    teamDoctors,
  } = doctorData;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Admin Doctor Info */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={profilePicture ? `http://194.238.17.230:8001/${profilePicture}` : fallbackImage}
            alt={fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800">{fullName}</h1>
            <div className="flex flex-wrap gap-3 mt-3 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                <FaUserMd /> {specialization}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">{qualification}</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                {experience} yrs Experience
              </span>
            </div>
            <p className="mt-3 text-indigo-700 flex items-center font-semibold text-lg">
              <FaRupeeSign className="mr-1" />
              {consultationFee}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> {email}
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-green-500" /> {phone}
          </p>
        </div>

        {/* Availability */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">Availability</h3>
          <div className="flex flex-wrap gap-2">
            {availability.map((slot, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full flex items-center gap-1"
              >
                <FaClock /> {slot.day}: {slot.startTime} - {slot.endTime}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Info */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-1">Clinic Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <FaHospital /> {clinicName}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> {clinicAddress}
          </p>
          <p className="flex items-center gap-2">
            <FaPhone /> {clinicContact}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> {clinicEmail}
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-600 italic">{clinicAbout}</p>
      </section>

      {/* Team Doctors */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Team Doctors</h3>
        {teamDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamDoctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={doc.profilePicture ? `http://194.238.17.230:8001/${doc.profilePicture}` : fallbackImage}
                    alt={doc.fullName}
                    className="w-20 h-20 rounded-full border object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{doc.fullName}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaUserMd /> {doc.specialization}
                    </p>
                    <p className="text-sm text-gray-400">Experience: {doc.experience} years</p>
                    <p className="text-sm text-indigo-600 font-medium flex items-center mt-1">
                      <FaRupeeSign /> {doc.consultationFee}
                    </p>
                  </div>
                </div>

                {/* Patients */}
               {/* Patients */}
<div className="mt-4">
  <h5 className="text-sm font-semibold text-gray-700 mb-3">Patients</h5>
  {doc.patients && doc.patients.length > 0 ? (
    <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
      {doc.patients.map((patient, pIdx) => (
        <div
          key={pIdx}
          className="p-4 rounded-md bg-gray-50 border border-gray-200 shadow-sm"
        >
          <div className="mb-1 flex items-center text-sm font-medium text-gray-800">
            <FaUser className="mr-2 text-blue-500" />
            {patient.fullName}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <FaPhone className="text-green-500" />
            {patient.mobileNumber}
          </div>
          <div className="text-sm text-gray-500 mt-1">Age: {patient.age}</div>
          <div className="text-sm text-gray-500">Address: {patient.address}</div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-sm text-gray-400 italic">No patients assigned yet.</p>
  )}
</div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No team doctors found.</p>
        )}
      </section>
    </div>
  );
};

export default DoctorDetails;
