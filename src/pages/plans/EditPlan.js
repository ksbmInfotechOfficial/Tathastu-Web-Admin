// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaPlus, FaTrash } from 'react-icons/fa';

// const EditPlan = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [planData, setPlanData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPlan = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8002/api/admin/get_plan/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setPlanData(res.data.package);
//       } catch (error) {
//         console.error('Error fetching plan:', error);
//         alert('Failed to load plan.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlan();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPlanData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleVariantChange = (index, field, value) => {
//     const updatedVariants = [...planData.variants];
//     updatedVariants[index][field] = value;
//     setPlanData({ ...planData, variants: updatedVariants });
//   };

//   const handleNoteChange = (variantIndex, noteIndex, value) => {
//     const updatedVariants = [...planData.variants];
//     updatedVariants[variantIndex].notes[noteIndex] = value;
//     setPlanData({ ...planData, variants: updatedVariants });
//   };

//   const addNote = (index) => {
//     const updatedVariants = [...planData.variants];
//     updatedVariants[index].notes.push('');
//     setPlanData({ ...planData, variants: updatedVariants });
//   };

//   const removeNote = (variantIndex, noteIndex) => {
//     const updatedVariants = [...planData.variants];
//     updatedVariants[variantIndex].notes.splice(noteIndex, 1);
//     setPlanData({ ...planData, variants: updatedVariants });
//   };

//   const addVariant = () => {
//     setPlanData({
//       ...planData,
//       variants: [
//         ...planData.variants,
//         {
//           type: '',
//           actualPrice: '',
//           discountedPrice: '',
//           numberOfCalls: '',
//           callDuration: '',
//           applicabilityOfDuration: '',
//           description: '',
//           notes: ['']
//         }
//       ]
//     });
//   };

//   const removeVariant = (index) => {
//     const updatedVariants = [...planData.variants];
//     updatedVariants.splice(index, 1);
//     setPlanData({ ...planData, variants: updatedVariants });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8002/api/admin/update_plan/${id}`, planData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert('Plan updated successfully!');
//       navigate('/plan');
//     } catch (error) {
//       console.error('Error updating plan:', error);
//       alert('Failed to update plan.');
//     }
//   };

//   if (loading || !planData) return <div className="text-center py-10 text-gray-600">Loading...</div>;

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="bg-white shadow-md rounded-2xl p-6">
//         <div className="flex items-center justify-between mb-6">
//           <button
//             type="button"
//             onClick={() => navigate('/plan')}
//             className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium"
//           >
//             ← Back
//           </button>

//           <h1 className="text-2xl md:text-3xl font-bold text-orange-700 text-center flex-1">
//             Update Plan
//           </h1>

//           {/* This placeholder keeps heading centered even with only one button */}
//           <div className="w-16"></div>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* General Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-sm font-medium text-gray-700">Package Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={planData.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-xl p-3"
//                 required
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">Frequency</label>
//               <input
//                 type="text"
//                 name="frequency"
//                 value={planData.frequency}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-xl p-3"
//                 required
//               />
//             </div>
//           </div>

//           <label className="flex items-center gap-3 text-sm text-gray-700 mt-2">
//             <input
//               type="checkbox"
//               name="isCustomPrice"
//               checked={planData.isCustomPrice}
//               onChange={handleChange}
//               className="h-4 w-4 text-orange-600"
//             />
//             Is Custom Price Applicable?
//           </label>

//           {/* Variants */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Variants</h2>
//             <div className="space-y-6">
//               {planData?.variants?.map((variant, index) => (
//                 <div key={index} className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-bold text-orange-600">Variant {index + 1}</h3>
//                     {planData.variants.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeVariant(index)}
//                         className="text-red-500 text-sm hover:underline flex items-center gap-1"
//                       >
//                         <FaTrash /> Remove
//                       </button>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input type="text" placeholder="Type" value={variant.type}
//                       onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
//                       className="border rounded-xl p-3"
//                       required
//                     />
//                     <input type="number" placeholder="Actual Price" value={variant.actualPrice}
//                       onChange={(e) => handleVariantChange(index, 'actualPrice', e.target.value)}
//                       className="border rounded-xl p-3"
//                       required
//                     />
//                     <input type="number" placeholder="Discounted Price" value={variant.discountedPrice}
//                       onChange={(e) => handleVariantChange(index, 'discountedPrice', e.target.value)}
//                       className="border rounded-xl p-3"
//                       required
//                     />
//                     <input type="text" placeholder="Number of Calls" value={variant.numberOfCalls}
//                       onChange={(e) => handleVariantChange(index, 'numberOfCalls', e.target.value)}
//                       className="border rounded-xl p-3"
//                       required
//                     />
//                     <input type="text" placeholder="Call Duration" value={variant.callDuration}
//                       onChange={(e) => handleVariantChange(index, 'callDuration', e.target.value)}
//                       className="border rounded-xl p-3"
//                       required
//                     />
//                     <input type="text" placeholder="Applicability of Duration" value={variant.applicabilityOfDuration}
//                       onChange={(e) => handleVariantChange(index, 'applicabilityOfDuration', e.target.value)}
//                       className="border rounded-xl p-3"
//                       required
//                     />
//                   </div>

//                   <textarea
//                     placeholder="Description"
//                     value={variant.description}
//                     onChange={(e) => handleVariantChange(index, 'description', e.target.value)}
//                     className="mt-4 w-full border p-3 rounded-xl"
//                     required
//                   />

//                   <div className="mt-4">
//                     <label className="block font-medium text-sm text-gray-700 mb-2">Notes</label>
//                     {variant.notes.map((note, noteIndex) => (
//                       <div key={noteIndex} className="flex gap-2 mb-2">
//                         <input
//                           type="text"
//                           value={note}
//                           onChange={(e) => handleNoteChange(index, noteIndex, e.target.value)}
//                           className="flex-1 border p-2 rounded-xl"
//                         />
//                         <button type="button" onClick={() => removeNote(index, noteIndex)} className="text-red-500">
//                           <FaTrash />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => addNote(index)}
//                       className="text-sm text-blue-600 mt-1 hover:underline"
//                     >
//                       + Add Note
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={addVariant}
//               className="mt-6 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700"
//             >
//               <FaPlus /> Add Another Variant
//             </button>
//           </div>

//           {/* Submit */}
//           <div className="pt-6 text-right">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold"
//             >
//               Update Plan
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPlan;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { APIURL } from '../../redux/api';

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${APIURL}/admin/get_plan/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPlanData(res.data.package);
      } catch (error) {
        console.error('Error fetching plan:', error);
        alert('Failed to load plan.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlanData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...planData.variants];
    updatedVariants[index][field] = value;
    setPlanData({ ...planData, variants: updatedVariants });
  };

  const handleNoteChange = (variantIndex, noteIndex, value) => {
    const updatedVariants = [...planData.variants];
    updatedVariants[variantIndex].notes[noteIndex] = value;
    setPlanData({ ...planData, variants: updatedVariants });
  };

  const addNote = (index) => {
    const updatedVariants = [...planData.variants];
    updatedVariants[index].notes.push('');
    setPlanData({ ...planData, variants: updatedVariants });
  };

  const removeNote = (variantIndex, noteIndex) => {
    const updatedVariants = [...planData.variants];
    updatedVariants[variantIndex].notes.splice(noteIndex, 1);
    setPlanData({ ...planData, variants: updatedVariants });
  };

  const addVariant = () => {
    setPlanData({
      ...planData,
      variants: [
        ...planData.variants,
        {
          type: '',
          actualPrice: '',
          discountedPrice: '',
          numberOfCalls: '',
          callDuration: '',
          applicabilityOfDuration: '',
          description: '',
          notes: ['']
        }
      ]
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...planData.variants];
    updatedVariants.splice(index, 1);
    setPlanData({ ...planData, variants: updatedVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${APIURL}/admin/update_plan/${id}`, planData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Plan updated successfully!');
      navigate('/plan');
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan.');
    }
  };

  if (loading || !planData) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="p-6 bg-[#FEE2E2] min-h-screen">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-[#D97706]">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate('/plan')}
            className="inline-flex items-center gap-2 text-[#D97706] hover:text-[#9A3412] font-medium"
          >
            ← Back
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-[#9A3412] text-center flex-1">
            Update Plan
          </h1>

          <div className="w-16"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-[#9A3412]">Package Name</label>
              <input
                type="text"
                name="name"
                value={planData.name}
                onChange={handleChange}
                className="mt-1 w-full border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#9A3412]">Frequency</label>
              <input
                type="text"
                name="frequency"
                value={planData.frequency}
                onChange={handleChange}
                className="mt-1 w-full border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm text-[#9A3412] mt-2">
            <input
              type="checkbox"
              name="isCustomPrice"
              checked={planData.isCustomPrice}
              onChange={handleChange}
              className="h-4 w-4 text-[#D97706]"
            />
            Is Custom Price Applicable?
          </label>

          {/* Variants */}
          <div>
            <h2 className="text-xl font-semibold text-[#9A3412] mb-2">Plan Variants</h2>
            <div className="space-y-6">
              {planData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="bg-[#FEE2E2] border border-[#D97706] rounded-xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-[#9A3412]">Variant {index + 1}</h3>
                    {planData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 text-sm hover:underline flex items-center gap-1"
                      >
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Type"
                      value={variant.type}
                      onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
                      required
                      className="border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <input
                      type="number"
                      placeholder="Actual Price"
                      value={variant.actualPrice}
                      onChange={(e) => handleVariantChange(index, 'actualPrice', e.target.value)}
                      required
                      className="border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <input
                      type="number"
                      placeholder="Discounted Price"
                      value={variant.discountedPrice}
                      onChange={(e) => handleVariantChange(index, 'discountedPrice', e.target.value)}
                      required
                      className="border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <input
                      type="text"
                      placeholder="Number of Calls"
                      value={variant.numberOfCalls}
                      onChange={(e) => handleVariantChange(index, 'numberOfCalls', e.target.value)}
                      required
                      className="border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <input
                      type="text"
                      placeholder="Call Duration"
                      value={variant.callDuration}
                      onChange={(e) => handleVariantChange(index, 'callDuration', e.target.value)}
                      required
                      className="border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                    <input
                      type="text"
                      placeholder="Applicability of Duration"
                      value={variant.applicabilityOfDuration}
                      onChange={(e) => handleVariantChange(index, 'applicabilityOfDuration', e.target.value)}
                      required
                      className="border border-[#D97706] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <textarea
                    placeholder="Description"
                    value={variant.description}
                    onChange={(e) => handleVariantChange(index, 'description', e.target.value)}
                    required
                    className="mt-4 w-full border border-[#D97706] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />

                  {/* Notes */}
                  <div className="mt-4">
                    <label className="block font-medium text-sm text-[#9A3412] mb-2">Notes</label>
                    {variant.notes.map((note, noteIndex) => (
                      <div key={noteIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={note}
                          onChange={(e) => handleNoteChange(index, noteIndex, e.target.value)}
                          className="flex-1 border border-[#D97706] p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                        />
                        <button
                          type="button"
                          onClick={() => removeNote(index, noteIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addNote(index)}
                      className="text-sm text-[#D97706] mt-1 hover:underline"
                    >
                      + Add Note
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="mt-6 inline-flex items-center gap-2 bg-[#D97706] text-white px-4 py-2 rounded-xl hover:bg-[#B45309]"
            >
              <FaPlus /> Add Another Variant
            </button>
          </div>

          {/* Submit */}
          <div className="pt-6 text-right">
            <button
              type="submit"
              className="bg-[#9A3412] text-white px-6 py-3 rounded-xl hover:bg-[#7C2D12] font-semibold"
            >
              Update Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlan;
