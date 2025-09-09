import React, { useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../redux/api';

const AddFamilyMemberForm = ({ onClose, onSuccess, customerId }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    relation: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${APIURL}/customer/add_family_member`, {
        customerId,
        ...form,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Add family member error:', err);
      setError('Failed to add family member. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-auto animate-fade-in-up">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {[
  { label: 'Name', name: 'name', type: 'text', required: true },
  { label: 'Age', name: 'age', type: 'number', required: true },
  { label: 'Gender', name: 'gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
  { label: 'Relation', name: 'relation', type: 'select', required: true, options: ['Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Son', 'Daughter', 'Other'] },
].map((field) =>
  field.type === 'select' ? (
    <div key={field.name} className={`flex flex-col ${field.colSpan ? 'md:col-span-2' : ''}`}>
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <select
        id={field.name}
        name={field.name}
        value={form[field.name]}
        onChange={handleChange}
        required={field.required}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Select</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div key={field.name} className={`flex flex-col ${field.colSpan ? 'md:col-span-2' : ''}`}>
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={form[field.name]}
        onChange={handleChange}
        required={field.required}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  )
)}


        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white rounded transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Family Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFamilyMemberForm;
