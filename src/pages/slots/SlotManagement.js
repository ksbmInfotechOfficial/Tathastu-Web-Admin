import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const adminId = useSelector((state) => state.admin?.admin?.user?.id);
  const token = useSelector((state) => state.admin?.token);

  useEffect(() => {
    const loadSlots = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          'http://194.238.17.230:8001/api/doctor/get_slots',
          {
            headers,
            params: { adminId },
          }
        );
        const slotsData = response.data.slots || [];
        setSlots(slotsData);
        setFilteredSlots(slotsData);
      } catch (err) {
        // setError('Failed to load slots.');
      } finally {
        setLoading(false);
      }
    };

    if (adminId) loadSlots();
  }, [adminId, token]);

  useEffect(() => {
    const filtered = slots.filter((slot) =>
      slot.doctorId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSlots(filtered);
  }, [searchTerm, slots]);

  const handleView = (slotId) => navigate(`/slots/${slotId}`);
  const handleEdit = (slotId) => navigate(`/edit_slot/${slotId}`);

  const renderStatus = (slot) => {
    if (!slot.bookings || slot.bookings.length === 0) return <span className="text-green-600">Available</span>;
    if (slot.bookings.length >= slot.maxBookings) return <span className="text-red-600">Full</span>;
    return <span className="text-yellow-600">Partial</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Appointment Slots</h2>
        <button
          onClick={() => navigate('/create_slots')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          + Create Slot
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Doctor Name..."
          className="w-full md:w-1/3 px-4 py-2 border border-blue-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-6 text-blue-600 font-medium">Loading slots...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : filteredSlots.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No matching slots found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Max Bookings</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Doctor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredSlots.map((slot) => (
                <tr key={slot._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2">{format(new Date(slot.date), 'dd MMM yyyy')}</td>
                  <td className="px-4 py-2">{slot.time}</td>
                  <td className="px-4 py-2">{slot.duration} min</td>
                  <td className="px-4 py-2">{slot.maxBookings}</td>
                  <td className="px-4 py-2">{slot.doctorId?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{renderStatus(slot)}</td>
                  {/* <td className="px-4 py-2 flex gap-3">
                    <button
                      onClick={() => handleView(slot._id)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(slot._id)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td> */}

                  <div className="flex gap-3 py-2">
                      <button
                       onClick={() => handleEdit(slot._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                         onClick={() => handleView(slot._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        View
                      </button>
                    </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SlotList;
