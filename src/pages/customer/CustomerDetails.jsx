import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { APIURL, IMAGEURL } from '../../redux/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ArrowLeft,
  Download,
  Loader2,
  User,
  Users,
  ShoppingCart,
  CalendarCheck,
} from 'lucide-react';

// Tab configuration
const tabConfig = [
  { key: 'info', label: 'Info', icon: User },
  { key: 'family', label: 'Family', icon: Users },
  { key: 'purchase', label: 'Purchases', icon: ShoppingCart },
  { key: 'bookings', label: 'Bookings', icon: CalendarCheck },
];

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  const [familyMemberDetails, setFamilyMemberDetails] = useState(null);
  const [loadingFamilyDetails, setLoadingFamilyDetails] = useState(false);
  const [bookingsPerPage, setBookingsPerPage] = useState(10);
  const [bookingFilterUser, setBookingFilterUser] = useState('all');
  const [purchasePage, setPurchasePage] = useState(1);
  const [purchaseLimit] = useState(5);
  const [bookingPage, setBookingPage] = useState(1);
  const [bookingLimit] = useState(10);
  const [purchasesPerPage, setPurchasesPerPage] = useState(10);
  const [purchaseFilterUser, setPurchaseFilterUser] = useState('all');
  const [editingPurchaseId, setEditingPurchaseId] = useState(null);
  const [newRemainingSessions, setNewRemainingSessions] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);





  // Fetching customer details
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${APIURL}/admin/get_customer_details/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { purchasePage, purchasesPerPage, bookingPage, bookingsPerPage },
      });
      setCustomerData(res.data.data);
      setPurchaseHistoryData(res.data.data.purchaseHistory)
    } catch (err) {
      console.error('Error fetching details:', err);
      setError('Failed to load customer details.');
    } finally {
      setLoading(false);
    }
  };

  // Fetching family member details
  const fetchFamilyMemberDetails = async (familyMemberId) => {
    try {
      setLoadingFamilyDetails(true);
      const res = await axios.get(`${APIURL}/admin/family-member/${familyMemberId}/details`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFamilyMemberDetails(res.data.data);
    } catch (error) {
      console.error('Error fetching family member details:', error);
      setFamilyMemberDetails(null);
    } finally {
      setLoadingFamilyDetails(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id, purchasePage, bookingPage]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-content');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${customerData.customer.fullName}_details.pdf`);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <Loader2 className="animate-spin text-[#9A3412] w-6 h-6 mx-auto" />
        <p className="text-[#9A3412] mt-2">Loading customer details...</p>
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const { customer, familyMembers, bookings } = customerData;


  // Filter bookings by selected user
const filteredBookings = bookings.data.filter((b) => {
  if (bookingFilterUser === 'all') return true;
  if (bookingFilterUser === 'self') return !b.bookedFor?.isFamilyMember;
  return b.bookedFor?.isFamilyMember && b.bookedFor?.name === bookingFilterUser;
});

// Pagination
const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
const paginatedBookings = filteredBookings.slice(
  (bookingPage - 1) * bookingsPerPage,
  bookingPage * bookingsPerPage
);


// Step 1: Filter purchases
const filteredPurchases = (purchaseHistoryData?.data || [])
.filter((p) => {
  if (purchaseFilterUser === 'all') return true;
  if (purchaseFilterUser === 'self') return !p.purchaseFor?.isFamilyMember;
  return p.purchaseFor?.isFamilyMember && (p.purchaseFor?.memberId?.name === purchaseFilterUser || p.purchaseFor?.name === purchaseFilterUser);
});

// Step 2: Paginate filtered purchases
const totalPurchasePages = Math.ceil(filteredPurchases.length / purchasesPerPage);
const paginatedPurchases = filteredPurchases.slice(
  (purchasePage - 1) * purchasesPerPage,
  purchasePage * purchasesPerPage
);



const handleUpdateRemainingSessions = async (purchaseId) => {
  if (newRemainingSessions === '') return;

  try {
    setIsUpdating(true);
    const res = await fetch(`https://tathashtuapi.ksdelhi.net/api/admin/update-remaining-sessions/${purchaseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remainingSessions: Number(newRemainingSessions) }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Update failed');

    // Update the original data (purchaseHistory.data) which is used in filteredPurchases
   setPurchaseHistoryData((prev) => ({
  ...prev,
  data: prev.data.map((p) =>
    p._id === purchaseId
      ? { ...p, remainingSessions: Number(newRemainingSessions) }
      : p
  ),
}));


    setEditingPurchaseId(null);
    setNewRemainingSessions('');
  } catch (err) {
    alert(err.message || 'Something went wrong');
  } finally {
    setIsUpdating(false);
  }
};






  return (
    <div className="p-6 bg-[#FBE6E7] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-[#9A3412] tracking-wide">Customer Details</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-[#7C2D12] shadow-sm transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] shadow-md transition"
          >
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-[#D97706] mb-8">
        {tabConfig.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`relative flex items-center gap-2 px-5 py-3 font-semibold transition duration-300 transform ${
              activeTab === key
                ? 'text-[#9A3412] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#9A3412] after:rounded-t-sm'
                : 'text-gray-500 hover:text-[#9A3412] hover:scale-110'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        id="pdf-content"
        className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto transition-all duration-300 ease-in-out"
      >
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={customer.profile ? `${IMAGEURL}/${customer.profile}` : '/images/defaultProfile.jpg'}
              alt={customer.fullName}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#FBBF24]"
            />
            <div className="space-y-2 text-gray-800 text-lg">
              <h2 className="text-2xl font-bold text-[#7C2D12]">{customer.fullName}</h2>
              <p><span className="font-semibold">Email:</span> {customer.email}</p>
              <p><span className="font-semibold">Mobile:</span> {customer.mobileNumber}</p>
              <p><span className="font-semibold">Gender:</span> {customer.gender} | <span className="font-semibold">Age:</span> {customer.age}</p>
              <p className="text-gray-600 italic">Joined on {new Date(customer.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
  <div className="space-y-4">
    {familyMembers.length === 0 ? (
      <p className="text-gray-500 italic text-sm bg-yellow-50 p-4 rounded-lg shadow-inner">
        No family members.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-yellow-300 bg-yellow-50 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-yellow-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Relation</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Age</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Gender</th>
              {/* Uncomment below if you want click-to-view more details */}
              {/* <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-200 text-sm text-gray-700">
            {familyMembers.map((m) => (
              <tr key={m._id} className="hover:bg-yellow-100 transition cursor-pointer">
                <td className="px-4 py-3 font-semibold text-[#7C2D12]">{m.name}</td>
                <td className="px-4 py-3 capitalize">{m.relation}</td>
                <td className="px-4 py-3">{m.age}</td>
                <td className="px-4 py-3 capitalize">{m.gender}</td>
                {/* Uncomment below if you want click-to-view more details */}
                {/* <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedFamilyMember(m);
                      fetchFamilyMemberDetails(m._id);
                    }}
                    className="text-yellow-700 underline hover:text-yellow-900"
                  >
                    View Details
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


        {/* Modal for Family Member Details */}
        {selectedFamilyMember && familyMemberDetails && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 animate-fadeIn">
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-2xl w-full relative transform transition-all animate-scaleIn max-h-[90vh] overflow-y-auto">
      
      {/* Close Icon */}
      <button
        onClick={() => {
          setSelectedFamilyMember(null);
          setFamilyMemberDetails(null);
        }}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        ✕
      </button>

      {loadingFamilyDetails ? (
        <div className="text-center py-12">
          <Loader2 className="animate-spin text-[#9A3412] w-8 h-8 mx-auto" />
          <p className="text-[#9A3412] mt-3 font-medium">Loading family member details...</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <h3 className="text-3xl font-bold text-[#7C2D12] mb-2">
            {familyMemberDetails.familyMember.name}
          </h3>
          <p className="text-gray-600 mb-1 font-medium">
            Relation: <span className="text-gray-800">{familyMemberDetails.familyMember.relation}</span>
          </p>
          <p className="text-gray-600">
            Age: {familyMemberDetails.familyMember.age} | Gender: {familyMemberDetails.familyMember.gender}
          </p>

          {/* Purchases Section */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-[#7C2D12] mb-3">Purchases</h4>
            {familyMemberDetails.purchases.length === 0 ? (
              <p className="text-gray-500 italic">No purchases found for this member.</p>
            ) : (
              <div className="space-y-4">
                {familyMemberDetails.purchases.map((purchase) => (
                  <div key={purchase._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <p className="text-lg font-bold">{purchase.packageName} <span className="text-gray-500">- ₹{purchase.price}</span></p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 text-sm rounded-full ${
                        purchase.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {purchase.status}
                    </span>
                    <p className="mt-2 text-gray-600">
                      Expiry Date: <strong>{new Date(purchase.expiryDate).toLocaleDateString()}</strong>
                    </p>
                    <p className="text-gray-500">
                      {purchase.variantDetails.numberOfCalls} | {purchase.variantDetails.callDuration}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookings Section */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-[#7C2D12] mb-3">Bookings</h4>
            {familyMemberDetails.bookings.length === 0 ? (
              <p className="text-gray-500 italic">No bookings found for this member.</p>
            ) : (
              <div className="space-y-4">
                {familyMemberDetails.bookings.map((booking) => (
                  <div key={booking._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <p className="text-lg font-bold">{booking.sessionName} <span className="text-gray-500">- {booking.sessionType}</span></p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 text-sm rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="mt-2 text-gray-600">
                      Paid: ₹{booking.payment.amount} ({booking.payment.provider})
                    </p>
                    <p className="text-gray-600">
                      Selected Date: {new Date(booking.selectedDate).toLocaleDateString()}
                    </p>
                    {booking.selectedAddOns?.length > 0 && (
                      <p className="text-gray-500">
                        Add-ons: {booking.selectedAddOns.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6 text-right">
            <button
              onClick={() => {
                setSelectedFamilyMember(null);
                setFamilyMemberDetails(null);
              }}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}


      {activeTab === 'purchase' && (
  <div className="space-y-4">
    {(purchaseHistoryData?.data || []).length === 0 ? (
      <p className="text-gray-500 italic text-sm bg-yellow-50 p-4 rounded-lg shadow-inner">
        No purchases found.
      </p>
    ) : (
      <>
        {/* 🔍 Filter & Rows Per Page Controls */}
        <div className="flex justify-between items-center mb-3">
          {/* Filter Dropdown */}
          <div>
            <select
              value={purchaseFilterUser}
              onChange={(e) => {
                setPurchaseFilterUser(e.target.value);
                setPurchasePage(1);
              }}
              className="border border-yellow-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">All Purchases</option>
              <option value="self">Self</option>
              {familyMembers.map((member) => (
                <option key={member._id} value={member.name}>
                  {member.name} ({member.relation})
                </option>
              ))}
            </select>
          </div>

          {/* Rows per page dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Rows per page:</label>
            <select
              value={purchasesPerPage}
              onChange={(e) => {
                setPurchasesPerPage(Number(e.target.value));
                setPurchasePage(1);
              }}
              className="border border-yellow-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              {[5, 10, 20, 50].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 📊 Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-yellow-300 bg-yellow-50 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-yellow-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Package Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Price & Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Purchased For</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Purchase Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Remaining Sessions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-200 text-sm text-gray-700">
              {paginatedPurchases.map((p) => (
                <tr key={p._id} className="hover:bg-yellow-100 transition">
                  <td className="px-4 py-3 font-semibold text-[#7C2D12]">{p.packageName}</td>
                  <td className="px-4 py-3 font-medium">₹{p.price} | {p.status}</td>
                  <td className="px-4 py-3">
                    {p.purchaseFor?.isFamilyMember
                      ? p.purchaseFor?.memberId?.name || p.purchaseFor?.name
                      : 'Self'}
                  </td>
                  <td className="px-4 py-3">{new Date(p.purchaseDate).toLocaleDateString()}</td>
                  {/* <td className="px-4 py-3">
                    {p.remainingSessions !== undefined ? p.remainingSessions : '—'}
                  </td> */}


                  {editingPurchaseId === p._id ? (
    <div className="flex items-center space-x-2 px-4 py-3">
      <input
        type="number"
        min="0"
        value={newRemainingSessions}
        onChange={(e) => setNewRemainingSessions(e.target.value)}
        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
      />
      <button
        onClick={() => handleUpdateRemainingSessions(p._id)}
        disabled={isUpdating}
        className="text-green-600 hover:underline text-sm"
      >
        Save
      </button>
      <button
        onClick={() => {
          setEditingPurchaseId(null);
          setNewRemainingSessions('');
        }}
        className="text-red-600 hover:underline text-sm"
      >
        Cancel
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-2 px-4 py-3">
      <span>{p.remainingSessions !== undefined ? p.remainingSessions : '—'}</span>
      <button
        onClick={() => {
          setEditingPurchaseId(p._id);
          setNewRemainingSessions(p.remainingSessions || 0);
        }}
        className="text-blue-600 hover:underline text-sm"
      >
        Edit
      </button>
    </div>
  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}

    {/* Pagination */}
    <div className="mt-6 flex justify-between items-center text-sm">
      <button
        disabled={purchasePage <= 1}
        onClick={() => setPurchasePage((p) => Math.max(1, p - 1))}
        className="px-5 py-2 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        ← Previous
      </button>
      <span className="text-[#7C2D12] font-semibold">
        Page {purchasePage} of {totalPurchasePages}
      </span>
      <button
        disabled={purchasePage >= totalPurchasePages}
        onClick={() => setPurchasePage((p) => p + 1)}
        className="px-5 py-2 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
)}


        {/* Bookings Tab */}
  {activeTab === 'bookings' && (
  <div className="space-y-4">
    {/* Filter + Rows Per Page */}
    <div className="flex justify-between items-center flex-wrap gap-4">
      {/* Booking For Filter */}
      <div>
        <label className="text-sm font-medium text-gray-700 mr-2">Booking For:</label>
        <select
          value={bookingFilterUser}
          onChange={(e) => {
            setBookingFilterUser(e.target.value);
            setBookingPage(1);
          }}
          className="border border-yellow-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="all">All</option>
          <option value="self">Self</option>
          {familyMembers.map((member) => (
            <option key={member._id} value={member.name}>
              {member.name} ({member.relation})
            </option>
          ))}
        </select>
      </div>

      {/* Rows Per Page */}
      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-700">Rows per page:</label>
        <select
          value={bookingsPerPage}
          onChange={(e) => {
            setBookingsPerPage(Number(e.target.value));
            setBookingPage(1);
          }}
          className="border border-yellow-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
        >
          {[5, 10, 20, 50].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-yellow-300 bg-yellow-50 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-yellow-200">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Session Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Session Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Booked For</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#7C2D12]">Paid</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-yellow-200 text-sm text-gray-700">
          {paginatedBookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500 italic">
                No bookings found.
              </td>
            </tr>
          ) : (
            paginatedBookings.map((b) => (
              <tr key={b._id} className="hover:bg-yellow-100 transition">
                <td className="px-4 py-3 font-semibold text-[#7C2D12]">
                  {b.sessionName || 'Session'}
                </td>
                <td className="px-4 py-3 capitalize">{b.sessionType}</td>
                <td className="px-4 py-3">
                  {b.bookedFor?.isFamilyMember
                    ? b.bookedFor?.name || 'Family Member'
                    : 'Self'}
                </td>
                <td className="px-4 py-3 capitalize">{b.status}</td>
                <td className="px-4 py-3">
                  {b.selectedDate ? new Date(b.selectedDate).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3">₹{b.payment?.amount || 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="mt-6 flex justify-between items-center text-sm">
      <button
        disabled={bookingPage <= 1}
        onClick={() => setBookingPage((p) => Math.max(1, p - 1))}
        className="px-5 py-2 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        ← Previous
      </button>
      <span className="text-[#7C2D12] font-semibold">
        Page {bookingPage} of {totalPages}
      </span>
      <button
        disabled={bookingPage >= totalPages}
        onClick={() => setBookingPage((p) => p + 1)}
        className="px-5 py-2 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default CustomerDetails;

