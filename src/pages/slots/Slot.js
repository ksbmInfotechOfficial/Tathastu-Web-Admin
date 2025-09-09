import React, { useEffect, useState } from 'react';
import EditSlotModal from './EditSlotModal'; // Adjust path if needed

const dummySlots = [
  {
    _id: '1',
    date: '2025-05-10',
    time: '10:00 AM - 10:30 AM',
    maxBookings: 3,
    bookings: [{}, {}, {}],
  },
  {
    _id: '2',
    date: '2025-05-10',
    time: '11:00 AM - 11:30 AM',
    maxBookings: 2,
    bookings: [{}],
  },
  {
    _id: '3',
    date: '2025-05-11',
    time: '12:00 PM - 12:30 PM',
    maxBookings: 2,
    bookings: [],
  },
];

const ViewSlots = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load slots on mount
  useEffect(() => {
    setSlots(dummySlots);
    setFilteredSlots(dummySlots);
  }, []);

  // Filter by date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const filtered = slots.filter((slot) => slot.date === selectedDate);
    setFilteredSlots(filtered.length ? filtered : []);
  };

  // Open Edit Modal
  const handleEdit = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  // Save changes from modal
  const handleSave = (updatedSlot) => {
    const updated = slots.map((s) => (s._id === updatedSlot._id ? updatedSlot : s));
    setSlots(updated);
    setFilteredSlots(updated.filter((s) => !date || s.date === date));
  };

  // Delete slot
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this slot?');
    if (!confirmed) return;
    const updated = slots.filter((slot) => slot._id !== id);
    setSlots(updated);
    setFilteredSlots(updated.filter((s) => !date || s.date === date));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#F7FBFF] min-h-[90vh] rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">My Created Slots</h2>

      <div className="bg-white p-6 rounded-md">
        <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
          <div className="flex-1">
            <label className="block text-blue-800 font-medium mb-1">Filter by Date</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border border-blue-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {filteredSlots.length === 0 ? (
          <p className="text-gray-600">No slots found{date && ` for ${date}`}</p>
        ) : (
          <div className="space-y-4">
            {filteredSlots.map((slot) => (
              <div
                key={slot._id}
                className="border rounded-md p-4 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-semibold text-blue-800">
                    🕒 {slot.date} | {slot.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    Bookings: {slot.bookings.length}/{slot.maxBookings}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(slot)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <EditSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slot={selectedSlot}
        onSave={handleSave}
      />
    </div>
  );
};

export default ViewSlots;
