import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = 'http://194.238.17.230:8001/api/doctor';
const token = localStorage.getItem('token');


const SymptomPage = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptomName, setSymptomName] = useState('');
  const [editId, setEditId] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchSymptoms = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_all_symptom`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, limit },
      });
      setSymptoms(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch symptoms');
    }
  };

  useEffect(() => {
    fetchSymptoms();
  }, [search, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptomName.trim()) return toast.warning('Please enter a symptom');

    try {
      if (editId) {
        await axios.put(`${API_BASE}/update_symptom/${editId}`, { name: symptomName }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Symptom updated');
      } else {
        await axios.post(`${API_BASE}/create_symptom`, { name: symptomName }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Symptom added');
      }

      setSymptomName('');
      setEditId(null);
      fetchSymptoms();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (symptom) => {
    setSymptomName(symptom.name);
    setEditId(symptom._id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/delete_symptom/${isConfirmingDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.error('Symptom deleted');
      setIsConfirmingDelete(null);
      fetchSymptoms();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete symptom');
    }
  };

  return (
    <div className="p-6 bg-[#F7FBFF] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Manage Symptoms</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter symptom"
          value={symptomName}
          onChange={(e) => setSymptomName(e.target.value)}
          className="flex-1 border border-blue-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className={`px-6 py-2 rounded text-white font-medium shadow ${
            editId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-900 hover:bg-blue-700'
          } transition`}
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Enhanced Search UI */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-1/3">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search symptoms..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-sm text-blue-700 underline hover:text-blue-900"
          >
            Clear
          </button>
        )}
      </div>

      {/* Symptom Table */}
      <div className="bg-white rounded-lg shadow border border-blue-100 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3">Symptom</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {symptoms.length > 0 ? (
              symptoms.map((symptom) => (
                <tr key={symptom._id} className="border-b hover:bg-blue-50">
                  <td className="px-6 py-4 font-medium text-blue-800">{symptom.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(symptom)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setIsConfirmingDelete(symptom._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-500">
                  No symptoms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
            disabled={page * limit >= total}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {isConfirmingDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Are you sure?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsConfirmingDelete(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomPage;
