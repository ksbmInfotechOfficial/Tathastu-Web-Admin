// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import axios from 'axios';

// const PlanPage = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [expandedPlanId, setExpandedPlanId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const toggleExpand = (id) => {
//     setExpandedPlanId(expandedPlanId === id ? null : id);
//   };

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await axios.get('http://localhost:8002/api/admin/get_all_plan', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setPlans(response.data?.packages || []);
//       } catch (err) {
//         console.error('Error fetching plans:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlans();
//   }, []);

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-orange-700">Packages</h1>
//         <button
//           onClick={() => navigate('/plan/add')}
//           className="flex items-center bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//         >
//           <FaPlus className="mr-2" />
//           Add New Package
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading packages...</p>
//       ) : plans.length === 0 ? (
//         <p>No packages found.</p>
//       ) : (
//         plans.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-white rounded-2xl shadow border border-orange-200 mb-6"
//           >
//             <div className="flex justify-between items-center px-6 py-4 cursor-pointer bg-orange-50 rounded-t-2xl">
//               <div>
//                 <h2 className="text-xl font-semibold text-orange-800">{plan.name}</h2>
//                 <p className="text-sm text-gray-500">Frequency: {plan.frequency}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button onClick={() => navigate(`/plan/edit/${plan._id}`)}>
//                   <FaEdit className="text-orange-600 hover:text-orange-800" />
//                 </button>
//                 <button onClick={() => alert('Delete not implemented')}>
//                   <FaTrash className="text-red-600 hover:text-red-800" />
//                 </button>
//                 <button onClick={() => toggleExpand(plan._id)}>
//                   {expandedPlanId === plan._id ? (
//                     <FaChevronUp className="text-orange-600" />
//                   ) : (
//                     <FaChevronDown className="text-orange-600" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {expandedPlanId === plan._id && (
//               <div className="p-6 space-y-6 bg-white rounded-b-2xl">
//                 {plan.variants.map((variant, index) => (
//                   <div
//                     key={variant._id}
//                     className="border border-gray-200 rounded-xl p-4 shadow-sm"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-lg font-bold text-orange-700">{variant.type}</h3>
//                       <div>
//                         <span className="text-green-600 font-semibold mr-2">
//                           ₹{variant.discountedPrice}
//                         </span>
//                         <span className="line-through text-gray-500 text-sm">
//                           ₹{variant.actualPrice}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-2">{variant.description}</p>

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
//                       <div>
//                         <strong>Calls:</strong> {variant.numberOfCalls}
//                       </div>
//                       <div>
//                         <strong>Duration:</strong> {variant.callDuration}
//                       </div>
//                       <div>
//                         <strong>Availability:</strong> {variant.applicabilityOfDuration}
//                       </div>
//                     </div>

//                     {variant.notes && variant.notes.length > 0 && (
//                       <ul className="mt-3 list-disc list-inside text-xs text-gray-500">
//                         {variant.notes.map((note, idx) => (
//                           <li key={idx}>{note}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PlanPage;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import axios from 'axios';

// const PlanPage = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [expandedPlanId, setExpandedPlanId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPlanId, setSelectedPlanId] = useState(null);

//   const toggleExpand = (id) => {
//     setExpandedPlanId(expandedPlanId === id ? null : id);
//   };

//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get('http://localhost:8002/api/admin/get_all_plan', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setPlans(response.data?.packages || []);
//     } catch (err) {
//       console.error('Error fetching plans:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:8002/api/admin/delete_plan/${selectedPlanId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setShowModal(false);
//       setSelectedPlanId(null);
//       fetchPlans(); // Refresh list
//     } catch (err) {
//       console.error('Error deleting plan:', err);
//       alert('Failed to delete plan');
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-orange-700">Packages</h1>
//         <button
//           onClick={() => navigate('/plan/add')}
//           className="flex items-center bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
//         >
//           <FaPlus className="mr-2" />
//           Add New Package
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading packages...</p>
//       ) : plans.length === 0 ? (
//         <p>No packages found.</p>
//       ) : (
//         plans.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-white rounded-2xl shadow border border-orange-200 mb-6"
//           >
//             <div className="flex justify-between items-center px-6 py-4 cursor-pointer bg-orange-50 rounded-t-2xl">
//               <div>
//                 <h2 className="text-xl font-semibold text-orange-800">{plan.name}</h2>
//                 <p className="text-sm text-gray-500">Frequency: {plan.frequency}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button onClick={() => navigate(`/plan/edit/${plan._id}`)}>
//                   <FaEdit className="text-orange-600 hover:text-orange-800" />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedPlanId(plan._id);
//                     setShowModal(true);
//                   }}
//                 >
//                   <FaTrash className="text-red-600 hover:text-red-800" />
//                 </button>
//                 <button onClick={() => toggleExpand(plan._id)}>
//                   {expandedPlanId === plan._id ? (
//                     <FaChevronUp className="text-orange-600" />
//                   ) : (
//                     <FaChevronDown className="text-orange-600" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {expandedPlanId === plan._id && (
//               <div className="p-6 space-y-6 bg-white rounded-b-2xl">
//                 {plan.variants.map((variant, index) => (
//                   <div
//                     key={variant._id}
//                     className="border border-gray-200 rounded-xl p-4 shadow-sm"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-lg font-bold text-orange-700">{variant.type}</h3>
//                       <div>
//                         <span className="text-green-600 font-semibold mr-2">
//                           ₹{variant.discountedPrice}
//                         </span>
//                         <span className="line-through text-gray-500 text-sm">
//                           ₹{variant.actualPrice}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-2">{variant.description}</p>

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
//                       <div>
//                         <strong>Calls:</strong> {variant.numberOfCalls}
//                       </div>
//                       <div>
//                         <strong>Duration:</strong> {variant.callDuration}
//                       </div>
//                       <div>
//                         <strong>Availability:</strong> {variant.applicabilityOfDuration}
//                       </div>
//                     </div>

//                     {variant.notes && variant.notes.length > 0 && (
//                       <ul className="mt-3 list-disc list-inside text-xs text-gray-500">
//                         {variant.notes.map((note, idx) => (
//                           <li key={idx}>{note}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}

//       {/* Delete Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
//           <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Plan?</h2>
//             <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this package? This action cannot be undone.</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlanPage;





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import { APIURL } from '../../redux/api';

const PlanPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${APIURL}/admin/get_all_plan`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPlans(response.data?.packages || []);
    } catch (err) {
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${APIURL}/admin/delete_plan/${selectedPlanId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setShowModal(false);
      setSelectedPlanId(null);
      fetchPlans();
    } catch (err) {
      console.error('Error deleting plan:', err);
      alert('Failed to delete plan');
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#9A3412]">Packages</h1>
        <button
          onClick={() => navigate('/plan/add')}
          className="flex items-center bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#9A3412] transition"
        >
          <FaPlus className="mr-2" />
          Add New Package
        </button>
      </div>

      {loading ? (
        <p className="text-[#9A3412]">Loading packages...</p>
      ) : plans.length === 0 ? (
        <p className="text-[#9A3412]">No packages found.</p>
      ) : (
        plans.map((plan, i) => (
          <div
            key={plan._id}
            className={`rounded-2xl shadow border mb-6 ${
              i % 2 === 0 ? 'bg-white border-[#E5E7EB]' : 'bg-[#FEE2E2] border-[#E5E7EB]'
            }`}
          >
            <div className="flex justify-between items-center px-6 py-4 cursor-pointer bg-[#9A3412] text-white rounded-t-2xl">
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-sm">Frequency: {plan.frequency}</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => navigate(`/plan/edit/${plan._id}`)}>
                  <FaEdit className="hover:text-[#FCD34D]" />
                </button>
                <button
                  onClick={() => {
                    setSelectedPlanId(plan._id);
                    setShowModal(true);
                  }}
                >
                  <FaTrash className="text-red-400 hover:text-red-600" />
                </button>
                <button onClick={() => toggleExpand(plan._id)}>
                  {expandedPlanId === plan._id ? (
                    <FaChevronUp className="text-white" />
                  ) : (
                    <FaChevronDown className="text-white" />
                  )}
                </button>
              </div>
            </div>

            {expandedPlanId === plan._id && (
              <div className="p-6 space-y-6">
                {plan.variants.map((variant) => (
                  <div
                    key={variant._id}
                    className="border border-[#D97706] rounded-xl p-4 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-[#9A3412]">{variant.type}</h3>
                      <div>
                        <span className="text-green-600 font-semibold mr-2">
                          ₹{variant.discountedPrice}
                        </span>
                        <span className="line-through text-gray-500 text-sm">
                          ₹{variant.actualPrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{variant.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div>
                        <strong>Calls:</strong> {variant.numberOfCalls}
                      </div>
                      <div>
                        <strong>Duration:</strong> {variant.callDuration}
                      </div>
                      <div>
                        <strong>Availability:</strong> {variant.applicabilityOfDuration}
                      </div>
                    </div>

                    {variant.notes && variant.notes.length > 0 && (
                      <ul className="mt-3 list-disc list-inside text-xs text-gray-500">
                        {variant.notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Plan?</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this package? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPage;
