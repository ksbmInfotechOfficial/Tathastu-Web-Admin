// import React, { useState } from 'react';
// import axios from 'axios';
// import { APIURL } from '../../redux/api';

// const BookSessionForm = ({ customer, onClose, onSuccess }) => {
//   const [sessionType, setSessionType] = useState('telephonic');
//   const [sessionName, setSessionName] = useState('');
//   const [bookingType, setBookingType] = useState('one-time-booking');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         sessionType,
//         sessionName,
//         bookingType,
//         userId: customer._id, // required
//       };

//       const res = await axios.post(`${APIURL}/customer/book_session_one_time`, payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });

//       alert('Booking successful!');
//       onSuccess();
//     } catch (err) {
//       console.error('Booking error:', err);
//       alert('Failed to book session.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-md relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-xl">&times;</button>
//         <h2 className="text-xl font-bold mb-4 text-[#9A3412]">Book Session for {customer.fullName}</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm text-[#9A3412] font-semibold">Session Type</label>
//             <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} className="w-full border px-3 py-2 rounded">
//               <option value="telephonic">Telephonic</option>
//               <option value="face-to-face">Face-to-face</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm text-[#9A3412] font-semibold">Session Name</label>
//             <input
//               type="text"
//               value={sessionName}
//               onChange={(e) => setSessionName(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               placeholder="e.g. Career Guidance"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-[#9A3412] font-semibold">Booking Type</label>
//             <select value={bookingType} onChange={(e) => setBookingType(e.target.value)} className="w-full border px-3 py-2 rounded">
//               <option value="one-time-booking">One-time booking</option>
//               <option value="Booking with package">Booking with package</option>
//               <option value="follow-up-session">Follow-up session</option>
//             </select>
//           </div>

//           <button type="submit" className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#9A3412]">
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookSessionForm;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIURL } from '../../redux/api';

const BookSessionForm = ({ customer, onClose, onSuccess }) => {
  const [sessionType, setSessionType] = useState('telephonic');
  const [sessionName, setSessionName] = useState('');
  const [bookingType, setBookingType] = useState('one-time-booking');
  const [bookingFor, setBookingFor] = useState('self'); // self | family
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState('');

  // Fetch family members when "family" is selected
  useEffect(() => {
    if (bookingFor === 'family') {
      axios
        .get(`${APIURL}/customer/get_family_members/${customer._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setFamilyMembers(res.data?.familyMembers || []);
        })
        .catch((err) => {
          console.error('Failed to fetch family members:', err);
        });
    }
  }, [bookingFor, customer._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userIdToBook = bookingFor === 'self' ? customer._id : selectedFamilyMemberId;

    if (bookingFor === 'family' && !selectedFamilyMemberId) {
      alert('Please select a family member.');
      return;
    }

    try {
      const payload = {
        sessionType,
        sessionName,
        bookingType,
        userId: userIdToBook,
      };

      await axios.post(`${APIURL}/customer/book_session_one_time`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      alert('Booking successful!');
      onSuccess();
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book session.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#9A3412]">Book Session</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Booking For: Self / Family */}
          <div>
            <label className="block text-sm text-[#9A3412] font-semibold mb-1">Booking For</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="self"
                  checked={bookingFor === 'self'}
                  onChange={() => setBookingFor('self')}
                  className="mr-2"
                />
                Self
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="family"
                  checked={bookingFor === 'family'}
                  onChange={() => setBookingFor('family')}
                  className="mr-2"
                />
                Family Member
              </label>
            </div>
          </div>

          {/* Family Member Dropdown */}
          {bookingFor === 'family' && (
            <div>
              <label className="block text-sm text-[#9A3412] font-semibold">Select Family Member</label>
              <select
                value={selectedFamilyMemberId}
                onChange={(e) => setSelectedFamilyMemberId(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">-- Select --</option>
                {familyMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} ({member.relation})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Session Type */}
          <div>
            <label className="block text-sm text-[#9A3412] font-semibold">Session Type</label>
            <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} className="w-full border px-3 py-2 rounded">
              <option value="telephonic">Telephonic</option>
              <option value="face-to-face">Face-to-face</option>
            </select>
          </div>

          {/* Session Name */}
          <div>
            <label className="block text-sm text-[#9A3412] font-semibold">Session Name</label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Career Guidance"
              required
            />
          </div>

          {/* Booking Type */}
          <div>
            <label className="block text-sm text-[#9A3412] font-semibold">Booking Type</label>
            <select value={bookingType} onChange={(e) => setBookingType(e.target.value)} className="w-full border px-3 py-2 rounded">
              <option value="one-time-booking">One-time booking</option>
              <option value="Booking with package">Booking with package</option>
              <option value="follow-up-session">Follow-up session</option>
            </select>
          </div>

          <button type="submit" className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#9A3412]">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookSessionForm;
