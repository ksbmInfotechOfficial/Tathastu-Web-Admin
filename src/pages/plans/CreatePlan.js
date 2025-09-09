// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaTrash } from 'react-icons/fa';

// const CreatePlan = () => {
//   const navigate = useNavigate();

//   const [planData, setPlanData] = useState({
//     name: '',
//     frequency: '',
//     isCustomPrice: false,
//     variants: [
//       {
//         type: '',
//         actualPrice: '',
//         discountedPrice: '',
//         numberOfCalls: '',
//         callDuration: '',
//         applicabilityOfDuration: '',
//         description: '',
//         notes: ['']
//       }
//     ]
//   });

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
//       await axios.post('http://localhost:8002/api/admin/create_plan', planData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       alert('Plan created successfully!');
//       navigate('/admin/packages');
//     } catch (error) {
//       console.error('Error creating plan:', error);
//       alert('Failed to create plan.');
//     }
//   };

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="bg-white shadow-md rounded-2xl p-6">


//         <div className="flex items-center justify-between mb-6">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium"
//           >
//             ← Back
//           </button>

//           <h1 className="text-2xl md:text-3xl font-bold text-orange-700 text-center flex-1">
//             Create New Plan
//           </h1>
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
//                 className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
//                 className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 placeholder="E.g., Every 10th Day"
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

//           {/* Variants Section */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Variants</h2>
//             <div className="space-y-6">
//               {planData.variants.map((variant, index) => (
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
//                       required className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     />
//                     <input type="number" placeholder="Actual Price" value={variant.actualPrice}
//                       onChange={(e) => handleVariantChange(index, 'actualPrice', e.target.value)}
//                       required className="border rounded-xl p-3"
//                     />
//                     <input type="number" placeholder="Discounted Price" value={variant.discountedPrice}
//                       onChange={(e) => handleVariantChange(index, 'discountedPrice', e.target.value)}
//                       required className="border rounded-xl p-3"
//                     />
//                     <input type="text" placeholder="Number of Calls" value={variant.numberOfCalls}
//                       onChange={(e) => handleVariantChange(index, 'numberOfCalls', e.target.value)}
//                       required className="border rounded-xl p-3"
//                     />
//                     <input type="text" placeholder="Call Duration" value={variant.callDuration}
//                       onChange={(e) => handleVariantChange(index, 'callDuration', e.target.value)}
//                       required className="border rounded-xl p-3"
//                     />
//                     <input type="text" placeholder="Applicability of Duration" value={variant.applicabilityOfDuration}
//                       onChange={(e) => handleVariantChange(index, 'applicabilityOfDuration', e.target.value)}
//                       required className="border rounded-xl p-3"
//                     />
//                   </div>

//                   <textarea placeholder="Description" value={variant.description}
//                     onChange={(e) => handleVariantChange(index, 'description', e.target.value)}
//                     required className="mt-4 w-full border p-3 rounded-xl"
//                   />

//                   {/* Notes */}
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
//               className="mt-6 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition"
//             >
//               <FaPlus /> Add Another Variant
//             </button>
//           </div>

//           {/* Submit */}
//           <div className="pt-6 text-right">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
//             >
//               Submit Plan
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePlan;



// CreatePlan.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaTrash } from 'react-icons/fa';

// const initialVariant = {
//   type: '',
//   actualPrice: '',
//   discountedPrice: '',
//   numberOfCalls: '',
//   callDuration: '',
//   applicabilityOfDuration: '',
//   description: '',
//   notes: ['']
// };

// const CreatePlan = () => {
//   const navigate = useNavigate();
//   const [planData, setPlanData] = useState({
//     name: '',
//     frequency: '',
//     isCustomPrice: false,
//     variants: [initialVariant]
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPlanData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const updateVariantField = (index, field, value) => {
//     const variants = [...planData.variants];
//     variants[index][field] = value;
//     setPlanData(prev => ({ ...prev, variants }));
//   };

//   const updateNote = (vIdx, nIdx, value) => {
//     const variants = [...planData.variants];
//     variants[vIdx].notes[nIdx] = value;
//     setPlanData(prev => ({ ...prev, variants }));
//   };

//   const addNote = (vIdx) => {
//     const variants = [...planData.variants];
//     variants[vIdx].notes.push('');
//     setPlanData(prev => ({ ...prev, variants }));
//   };

//   const removeNote = (vIdx, nIdx) => {
//     const variants = [...planData.variants];
//     variants[vIdx].notes.splice(nIdx, 1);
//     setPlanData(prev => ({ ...prev, variants }));
//   };

//   const addVariant = () => {
//     setPlanData(prev => ({
//       ...prev,
//       variants: [...prev.variants, { ...initialVariant }]
//     }));
//   };

//   const removeVariant = (index) => {
//     const variants = [...planData.variants];
//     variants.splice(index, 1);
//     setPlanData(prev => ({ ...prev, variants }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8002/api/admin/create_plan', planData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       alert('Plan created successfully!');
//       navigate('/admin/packages');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to create plan.');
//     }
//   };

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="bg-white shadow-md rounded-2xl p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={() => navigate('/plan')}
//             className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium"
//           >
//             ← Back
//           </button>
//           <h1 className="text-2xl md:text-3xl font-bold text-orange-700 text-center flex-1">
//             Create New Plan
//           </h1>
//           <div className="w-16"></div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-sm font-medium text-gray-700">Package Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={planData.name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">Frequency</label>
//               <input
//                 type="text"
//                 name="frequency"
//                 value={planData.frequency}
//                 onChange={handleChange}
//                 placeholder="E.g., Every 10th Day"
//                 required
//                 className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
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

//           {/* Plan Variants */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Variants</h2>
//             <div className="space-y-6">
//               {planData.variants.map((variant, index) => (
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
//                     {['type', 'actualPrice', 'discountedPrice', 'numberOfCalls', 'callDuration', 'applicabilityOfDuration']
//                       .map((field, i) => (
//                         <input
//                           key={i}
//                           type={field.includes('Price') ? 'number' : 'text'}
//                           placeholder={field.replace(/([A-Z])/g, ' $1')}
//                           value={variant[field]}
//                           onChange={(e) => updateVariantField(index, field, e.target.value)}
//                           required
//                           className="border rounded-xl p-3"
//                         />
//                       ))}
//                   </div>

//                   <textarea
//                     placeholder="Description"
//                     value={variant.description}
//                     onChange={(e) => updateVariantField(index, 'description', e.target.value)}
//                     required
//                     className="mt-4 w-full border p-3 rounded-xl"
//                   />

//                   {/* Notes */}
//                   <div className="mt-4">
//                     <label className="block font-medium text-sm text-gray-700 mb-2">Notes</label>
//                     {variant.notes.map((note, noteIndex) => (
//                       <div key={noteIndex} className="flex gap-2 mb-2">
//                         <input
//                           type="text"
//                           value={note}
//                           onChange={(e) => updateNote(index, noteIndex, e.target.value)}
//                           className="flex-1 border p-2 rounded-xl"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeNote(index, noteIndex)}
//                           className="text-red-500"
//                         >
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

//             {/* Add Variant */}
//             <button
//               type="button"
//               onClick={addVariant}
//               className="mt-6 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700"
//             >
//               <FaPlus /> Add Another Variant
//             </button>
//           </div>

//           {/* Submit Button */}
//           <div className="pt-6 text-right">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 font-semibold"
//             >
//               Submit Plan
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePlan;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { APIURL } from '../../redux/api';

const CreatePlan = () => {
  const navigate = useNavigate();

  const [planData, setPlanData] = useState({
    name: '',
    frequency: '',
    isCustomPrice: false,
    variants: [
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
      await axios.post(`${APIURL}/admin/create_plan`, planData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Plan created successfully!');
      navigate('/plan');
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan.');
    }
  };

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
            Create New Plan
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
                placeholder="E.g., Every 10th Day"
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

          {/* Variants Section */}
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
              className="mt-6 inline-flex items-center gap-2 bg-[#D97706] text-white px-4 py-2 rounded-xl hover:bg-[#9A3412] transition"
            >
              <FaPlus /> Add Another Variant
            </button>
          </div>

          {/* Submit */}
          <div className="pt-6 text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
            >
              Submit Plan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
