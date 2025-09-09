import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL, IMAGEURL } from '../../redux/api';
import { BiSearch } from "react-icons/bi";
import AddCustomerForm from './AddCustomerForm';
import AddFamilyMemberForm from './AddFamilyMemberForm';
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [showBookForm, setShowBookForm] = useState(false);
  const [showAddFamilyMemberForm, setShowAddFamilyMemberForm] = useState(false);


  const navigate = useNavigate()

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (gender) params.gender = gender;

      const res = await axios.get(`${APIURL}/admin/get_all_customer`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params,
      });
      setCustomers(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to fetch customers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, search, gender]);

  // const handleView = (customer) => {
  //   setSelectedCustomer(customer);
  //   setShowViewModal(true);
  // };

    const handleView = (customer) => {
    navigate(`/customers/${customer._id}`);
  };

  const handleDelete = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      await axios.delete(`${APIURL}/customer/delete_customer/${customerId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchCustomers();
      alert('Customer deleted successfully.');
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert('Failed to delete customer.');
    }
  };

  return (
    <div className="px-6 py-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#9A3412]">Customer List</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#9A3412]"
        >
          + Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D97706] text-lg" />
          <input
            type="text"
            placeholder="Search by name or mobile"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="pl-10 border border-[#D97706] rounded px-4 py-2 w-full text-[#7C2D12] focus:outline-none"
          />
        </div>

        <select
          value={gender}
          onChange={(e) => { setPage(1); setGender(e.target.value); }}
          className="border border-[#D97706] rounded px-4 py-2 w-full md:w-1/4 text-[#7C2D12]"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Customer Table */}
      {loading ? (
        <p className="text-[#9A3412]">Loading customers...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : customers.length === 0 ? (
        <p className="text-[#9A3412]">No customers found.</p>
      ) : (
        <div className="relative w-full overflow-x-auto border border-[#D97706] rounded-lg shadow-md bg-white">
          <table className="w-full  table-fixed divide-y divide-[#FBBF24]">
            <thead className="bg-[#9A3412] text-white">
              <tr>
                <th className="px-6 py-2 text-left text-xs font-semibold">Profile</th>
                <th className="px-6 py-2 text-left text-xs font-semibold">Full Name</th>
                <th className="px-6 py-2 text-left text-xs font-semibold">Email</th>
                <th className="px-6 py-2 text-left text-xs font-semibold">Mobile</th>
                <th className="px-6 py-2 text-left text-xs font-semibold">Gender</th>
                <th className="px-6 py-2 text-left text-xs font-semibold">Reference</th>
                <th className="px-6 w-56 py-2 text-center text-xs font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FEE2E2]">
              {customers.map((customer, idx) => (
                <tr key={customer._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FEE2E2]'}>
                  <td className="px-4 py-1">
                    <img
                      src={customer.profile ? `${IMAGEURL}/${customer.profile}` : "/images/defaultProfile.jpg"}
                      alt={customer.fullName || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/defaultProfile.jpg"; }}
                    />
                  </td>
                  <td className="px-4 text-[#7C2D12] font-medium truncate">{customer.fullName}</td>
                  <td className="px-4 text-gray-700 truncate">{customer.email}</td>
                  <td className="px-4 text-gray-700">{customer.mobileNumber}</td>
                  <td className="px-4 text-gray-700">{customer.gender}</td>
                  <td className="px-4 text-gray-700 truncate">{customer.howDidYouHear || 'N/A'}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleView(customer)}
                      className="bg-[#D97706] hover:bg-[#9A3412] text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                    <button
                       onClick={() => {
                          setSelectedCustomer(customer);
                          setShowBookForm(true);
                        }}
                      className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded text-sm"
                    >
                      Book
                    </button>

                    <button
  onClick={() => {
    setSelectedCustomer(customer);
    setShowAddFamilyMemberForm(true);
  }}
  className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm"
>
  Add Family
</button>


                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-[#9A3412]">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>


      {showAddFamilyMemberForm && selectedCustomer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
      <button
        onClick={() => setShowAddFamilyMemberForm(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>
      <AddFamilyMemberForm
        customerId={selectedCustomer._id}
        onClose={() => setShowAddFamilyMemberForm(false)}
        onSuccess={() => {
          setShowAddFamilyMemberForm(false);
          fetchCustomers(); // Fetch updated list of customers
        }}
      />
    </div>
  </div>
)}


      {/* Add Customer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-[#9A3412] mb-4 border-b pb-2">
              Add New Customer
            </h2>
            <AddCustomerForm
              onClose={() => setShowAddForm(false)}
              onSuccess={() => {
                setShowAddForm(false);
                fetchCustomers();
              }}
            />
          </div>
        </div>
      )}

      {/* View Customer Modal */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-[#9A3412] mb-4">Customer Details</h2>
            <p><strong>Name:</strong> {selectedCustomer.fullName}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Mobile:</strong> {selectedCustomer.mobileNumber}</p>
            <p><strong>Gender:</strong> {selectedCustomer.gender}</p>
            <p><strong>Reference:</strong> {selectedCustomer.howDidYouHear || 'N/A'}</p>
          </div>
        </div>
      )}


       {/* Book Session Modal */}
      {showBookForm && selectedCustomer && (
        <BookSessionForm
          customer={selectedCustomer}
          onClose={() => setShowBookForm(false)}
          onSuccess={() => {
            setShowBookForm(false);
            fetchCustomers();
          }}
        />
      )}
    </div>
  );
};

export default CustomerPage;



// const BookSessionForm = ({ customer, onClose, onSuccess }) => {
//   const [sessionType, setSessionType] = useState('telephonic');
//   const [sessionName, setSessionName] = useState('');
//   const [bookingType, setBookingType] = useState('one-time-booking');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${APIURL}/customer/book_session_one_time`, {
//         sessionType,
//         sessionName,
//         bookingType,
//         userId: customer._id,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       alert('Booking successful!');
//       onSuccess();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to book session.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
//       <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative animate-fade-in-up">
//         <button
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute top-4 right-4 text-3xl font-semibold text-gray-400 hover:text-gray-700 transition"
//           type="button"
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-extrabold mb-6 text-[#9A3412] tracking-wide text-center">
//           Book Session for {customer.fullName}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="sessionType" className="block mb-2 text-sm font-semibold text-[#9A3412]">
//               Session Type
//             </label>
//             <select
//               id="sessionType"
//               value={sessionType}
//               onChange={(e) => setSessionType(e.target.value)}
//               className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
//               required
//             >
//               <option value="telephonic">Telephonic</option>
//               <option value="face-to-face">Face-to-face</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="sessionName" className="block mb-2 text-sm font-semibold text-[#9A3412]">
//               Session Name
//             </label>
//             <select
//               id="sessionName"
//               value={sessionName}
//               onChange={(e) => setSessionName(e.target.value)}
//               className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
//               required
//             >
//               <option value="" disabled>-- Select a session --</option>
//               <option value="Face-to-Face (In-person, up to 90 minutes)">
//                 A. Face-to-Face (In-person, up to 90 minutes)
//               </option>
//               <option value="Telephonic (Phone call, up to 75 minutes)">
//                 B. Telephonic (Phone call, up to 75 minutes)
//               </option>
//               <option value="Telephonic (Phone call, up to 55 minutes)">
//                 C. Telephonic (Phone call, up to 55 minutes)
//               </option>
//               <option value="Book combined sessions for husband & wife">
//                 D. Book combined sessions for husband & wife
//               </option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="bookingType" className="block mb-2 text-sm font-semibold text-[#9A3412]">
//               Booking Type
//             </label>
//             <select
//               id="bookingType"
//               value={bookingType}
//               onChange={(e) => setBookingType(e.target.value)}
//               className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
//               required
//             >
//               <option value="one-time-booking">One-time booking</option>
//               <option value="Booking with package">Booking with package</option>
//               <option value="follow-up-session">Follow-up session</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#D97706] hover:bg-[#9A3412] text-white font-semibold py-3 rounded-md shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Booking...' : 'Confirm Booking'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };


const BookSessionForm = ({ customer, onClose, onSuccess }) => {
  const [sessionType, setSessionType] = useState('telephonic');
  const [sessionName, setSessionName] = useState('');
  const [bookingType, setBookingType] = useState('one-time-booking');
  const [bookingFor, setBookingFor] = useState('self');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingFamily, setFetchingFamily] = useState(false);

  // Fetch family members when 'family' is selected
  useEffect(() => {
    if (bookingFor === 'family') {
      setFetchingFamily(true);
      axios.get(`${APIURL}/customer/get_family_members/${customer._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          setFamilyMembers(res.data?.members || []);
        })
        .catch((err) => {
          console.error('Error fetching family members:', err);
        })
        .finally(() => {
          setFetchingFamily(false);
        });
    }
  }, [bookingFor, customer._id]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // const userId = bookingFor === 'self' ? customer._id : selectedFamilyMemberId;
  const userId = customer._id

  if (bookingFor === 'family' && !selectedFamilyMemberId) {
    alert('Please select a family member.');
    setLoading(false);
    return;
  }

  let bookedFor = undefined;

  if (bookingFor === 'family') {
    const selectedMember = familyMembers.find((m) => m._id === selectedFamilyMemberId);
    if (!selectedMember) {
      alert('Invalid family member selected.');
      setLoading(false);
      return;
    }

    bookedFor = {
      isFamilyMember: true,
      name: selectedMember.name,
      age: selectedMember.age,
      gender: selectedMember.gender,
      relation: selectedMember.relation,
    };
  }

  try {
    await axios.post(`${APIURL}/customer/book_session_one_time`, {
      sessionType,
      sessionName,
      bookingType,
      userId,
      ...(bookedFor && { bookedFor }),
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    alert('Booking successful!');
    onSuccess();
  } catch (err) {
    console.error(err);
    alert('Failed to book session.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative animate-fade-in-up">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-3xl font-semibold text-gray-400 hover:text-gray-700 transition"
          type="button"
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold mb-6 text-[#9A3412] tracking-wide text-center">
          Book Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Booking For */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#9A3412]">
              Booking For
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="self"
                  checked={bookingFor === 'self'}
                  onChange={() => setBookingFor('self')}
                />
                <span>Self</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="family"
                  checked={bookingFor === 'family'}
                  onChange={() => setBookingFor('family')}
                />
                <span>Family Member</span>
              </label>
            </div>
          </div>

          {/* Family Member Dropdown */}
          {bookingFor === 'family' && (
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#9A3412]">
                Select Family Member
              </label>
              {fetchingFamily ? (
                <p className="text-sm text-gray-500">Loading family members...</p>
              ) : (
                <select
                  value={selectedFamilyMemberId}
                  onChange={(e) => setSelectedFamilyMemberId(e.target.value)}
                  className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
                  required
                >
                  <option value="">-- Select Member --</option>
                  {familyMembers.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.relation})
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Session Type */}
          <div>
            <label htmlFor="sessionType" className="block mb-2 text-sm font-semibold text-[#9A3412]">
              Session Type
            </label>
            <select
              id="sessionType"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
              required
            >
              <option value="telephonic">Telephonic</option>
              <option value="face-to-face">Face-to-face</option>
            </select>
          </div>

          {/* Session Name */}
          <div>
            <label htmlFor="sessionName" className="block mb-2 text-sm font-semibold text-[#9A3412]">
              Session Name
            </label>
            <select
              id="sessionName"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
              required
            >
              <option value="" disabled>-- Select a session --</option>
              <option value="Face-to-Face (In-person, up to 90 minutes)">
                A. Face-to-Face (In-person, up to 90 minutes)
              </option>
              <option value="Telephonic (Phone call, up to 75 minutes)">
                B. Telephonic (Phone call, up to 75 minutes)
              </option>
              <option value="Telephonic (Phone call, up to 55 minutes)">
                C. Telephonic (Phone call, up to 55 minutes)
              </option>
              <option value="Book combined sessions for husband & wife">
                D. Book combined sessions for husband & wife
              </option>
            </select>
          </div>

          {/* Booking Type */}
          <div>
            <label htmlFor="bookingType" className="block mb-2 text-sm font-semibold text-[#9A3412]">
              Booking Type
            </label>
            <select
              id="bookingType"
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
              className="w-full border border-[#D97706] rounded-md px-4 py-3 text-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent transition"
              required
            >
              <option value="one-time-booking">One-time booking</option>
              <option value="Booking with package">Booking with package</option>
              <option value="follow-up-session">Follow-up session</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D97706] hover:bg-[#9A3412] text-white font-semibold py-3 rounded-md shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};




