import React, { useState, useEffect } from 'react';

const EditSlotModal = ({ isOpen, onClose, slot, onSave }) => {
  const [time, setTime] = useState('');
  const [maxBookings, setMaxBookings] = useState(1);

  useEffect(() => {
    if (slot) {
      setTime(slot.time);
      setMaxBookings(slot.maxBookings);
    }
  }, [slot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || !maxBookings) return;
    onSave({ ...slot, time, maxBookings: Number(maxBookings) });
    onClose();
  };

  if (!isOpen || !slot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Edit Slot</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm text-blue-800 mb-1">Time</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-blue-300 rounded-md px-4 py-2"
              placeholder="e.g. 10:00 AM - 10:30 AM"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-blue-800 mb-1">Max Bookings</label>
            <input
              type="number"
              value={maxBookings}
              min="1"
              onChange={(e) => setMaxBookings(e.target.value)}
              className="w-full border border-blue-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSlotModal;
