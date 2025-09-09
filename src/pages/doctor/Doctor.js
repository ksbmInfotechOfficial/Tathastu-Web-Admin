// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllDoctors, deleteDoctor } from '../../redux/actions/adminActions';
// import { useNavigate } from 'react-router-dom';
// import { FaEdit, FaTrash } from 'react-icons/fa';


// const DoctorList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.admin.token);
//   const doctors = useSelector((state) => state.admin.doctors);
//   const adminData = useSelector((state) => state.admin.admin);
//   const adminId = adminData?._id || adminData.user?.id; // Fallback if stored differently
//   const role = adminData.user?.role;
//    console.log("AdminId", role)

//    useEffect(() => {
//     if (token) {
//       let payload = { token };
  
//       if (role === 'doctorAdmin') {
//         payload.createdBy = adminId;
//       }
  
//       console.log("DISPATCHING getAllDoctors with:", payload);
//       dispatch(getAllDoctors(payload));
//     }
//   }, [token, dispatch, adminId, role]);
  

//   const handleDelete = (doctorId) => {
//     if (window.confirm('Are you sure you want to delete this doctor?')) {
//       dispatch(deleteDoctor(doctorId, token));
//     }
//   };

//   const handleUpdate = (doctorId) => {
//     navigate(`/doctors/update/${doctorId}`);
//   };

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-blue-900">All Doctors</h2>
//         <button
//           onClick={() => navigate('/doctors/add')}
//           className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           + Add Doctor
//         </button>
//       </div>

//       {doctors && Array.isArray(doctors) && doctors.length > 0 ? (
//         <div className="overflow-x-auto bg-white rounded-lg shadow border border-blue-100">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-blue-900 text-white">
//               <tr>
//                 <th className="px-6 py-3">Full Name</th>
//                 <th className="px-6 py-3">Profile</th>
//                 <th className="px-6 py-3">Specialization</th>
//                 <th className="px-6 py-3">Email</th>
//                 <th className="px-6 py-3">Phone</th>
//                 <th className="px-6 py-3">Experience (yrs)</th>
//                 <th className="px-6 py-3">Clinic Address</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors.map((doc) => (
//                 <tr key={doc._id} className="border-b hover:bg-blue-50">
//                   <td className="px-6 py-4 font-medium text-blue-800">{doc.fullName}</td>
//                   <td className="px-6 py-4">
//                     <img
//                       src={
//                         doc.profilePicture
//                           ? `http://194.238.17.230:8001/${doc.profilePicture}`
//                           : '/images/defaultProfile.jpg'
//                       }
//                       alt={doc.fullName}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   </td>


//                   <td className="px-6 py-4">{doc.specialization}</td>
//                   <td className="px-6 py-4">{doc.email}</td>
//                   <td className="px-6 py-4">{doc.phone}</td>
//                   <td className="px-6 py-4">{doc.experience}</td>
//                   <td className="px-6 py-4">{doc.clinicAddress}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex space-x-4"> {/* Align buttons horizontally */}
//                       <button
//                         onClick={() => handleUpdate(doc._id)}
//                         className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
//                       >
//                         <FaEdit />

//                       </button>

//                       <button
//                         onClick={() => handleDelete(doc._id)}
//                         className="text-red-600 hover:text-red-800 flex items-center space-x-1"
//                       >
//                         <FaTrash />

//                       </button>
//                     </div>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-600">No doctors found.</p>
//       )}
//     </div>
//   );
// };

// export default DoctorList;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors, deleteDoctor } from '../../redux/actions/adminActions';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye  } from 'react-icons/fa';

const DoctorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.admin.token);
  const doctors = useSelector((state) => state.admin.doctors);
  const pagination = useSelector((state) => state.admin.pagination);
  const totalPages = pagination?.totalPages || 1;

  console.log("totalPages", totalPages)


  const adminData = useSelector((state) => state.admin.admin);
  const adminId = adminData?._id || adminData.user?.id;
  const role = adminData.user?.role;

  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchDoctors = () => {
    if (token) {
      const payload = {
        token,
        page,
        limit,
        search,
        specialty,
        gender,
        ...(role === 'doctorAdmin' && { createdBy: adminId }),
      };
      dispatch(getAllDoctors(payload));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [token, page, specialty, gender, search]);

  const handleDelete = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      dispatch(deleteDoctor(doctorId, token));
    }
  };

  const handleUpdate = (doctorId) => {
    navigate(`/doctors/update/${doctorId}`);
  };

  const handleView = (doctorId) => {
  navigate(`/doctors/view/${doctorId}`);
};


  return (
    <div className="p-6 bg-[#F7FBFF] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900">All Doctors</h2>
        <button
          onClick={() => navigate('/doctors/add')}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Doctor
        </button>
      </div>

      {/* === Filters === */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name/specialty"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-60"
        />

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Specialties</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Neurologist">Neurologist</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {doctors && Array.isArray(doctors) && doctors.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-blue-100">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Profile</th>
                  <th className="px-6 py-3">Specialization</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Experience</th>
                  <th className="px-6 py-3">Clinic Address</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc._id} className="border-b hover:bg-blue-50">
                    <td className="px-6 py-4 text-blue-800 font-medium">{doc.fullName}</td>
                    <td className="px-6 py-4">
                      <img
                        src={
                          doc.profilePicture
                            ? `http://194.238.17.230:8001/${doc.profilePicture}`
                            : '/images/defaultProfile.jpg'
                        }
                        alt={doc.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{doc.specialization}</td>
                    <td className="px-6 py-4">{doc.email}</td>
                    <td className="px-6 py-4">{doc.phone}</td>
                    <td className="px-6 py-4">{doc.experience}</td>
                    <td className="px-6 py-4">{doc.clinicAddress}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                         <button onClick={() => handleView(doc._id)} className="text-green-600 hover:text-green-800">
      <FaEye />
    </button>
                        <button onClick={() => handleUpdate(doc._id)} className="text-blue-600 hover:text-blue-800">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(doc._id)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* === Pagination === */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-1 rounded ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Prev
            </button>
            <span className="text-gray-600">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
              disabled={page >= totalPages}
              className={`px-4 py-1 rounded ${
                page >= totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600 mt-6">No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorList;

