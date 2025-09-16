import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EliteRequests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeductModalOpen, setIsDeductModalOpen] = useState(false); // New state for the deduct session modal
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [parentId, setParentId] = useState(null)
  const [newPrice, setNewPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDeductVariantId, setSelectedDeductVariantId] = useState(null); // Store selected variant for deduction

  // New state for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch function with filtering and searching
  const fetchEliteRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://apitathastu.astroone.in/api/admin/get_super_elite_package_request',
        {
          params: {
            page,
            limit,
            search: searchTerm, // Ensure the backend can handle this
            status: statusFilter, // Send filter in the API request
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setRequests(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching Super Elite requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEliteRequests();
  }, [page, searchTerm, statusFilter]); // Fetch again when page, searchTerm, or statusFilter change

  const openModal = (parentId, variantId, price) => {
    console.log("variant id", variantId)
    console.log("priceee", price)
    setSelectedVariantId(variantId);
    setParentId(parentId);
    setNewPrice(price);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeductModalOpen(false); // Close both modals
  };

  const updatePrice = async () => {
    if (!newPrice || isNaN(newPrice) || newPrice <= 0) {
      alert('Please enter a valid price');
      return;
    }


    const numericPrice = Number(newPrice);


    try {
      await axios.put(
        `https://apitathastu.astroone.in/api/admin/update_superelite_request_price/${parentId}`,
        { price: numericPrice, variantId: selectedVariantId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Price updated successfully');
      closeModal();
      fetchEliteRequests();
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Error updating price');
    }
  };

  const updateStatus = async (requestId, newStatus) => {
    try {
      await axios.put(
        `https://apitathastu.astroone.in/api/admin/update_super_elite_status/${requestId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert(`Status updated to ${newStatus}`);
      fetchEliteRequests();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const deductSession = async () => {
    if (!selectedDeductVariantId) return;

    try {
      await axios.post(
        `https://apitathastu.astroone.in/api/admin/deduct-session-and-update/${selectedDeductVariantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Session deducted successfully');
      closeModal();
      fetchEliteRequests();
    } catch (error) {
      console.error('Error deducting session:', error);
      alert('Error deducting session');
    }
  };

  const openDeductModal = (variantId) => {
    setSelectedDeductVariantId(variantId);
    setIsDeductModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen max-w-7xl mx-auto overflow-x-hidden">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-[#9A3412]">Requests</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex justify-between items-center gap-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-1/3"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        >
          <option value="">All Status</option>
          <option value="contacted">Contacted</option>
          <option value="not-contacted">Not Contacted</option>
          <option value="payment-link-sended">Payment Link Sended</option>
          <option value="purchased">Purchased</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200 mt-4">
        {loading ? (
          <div className="flex justify-center items-center py-4">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="flex justify-center items-center py-4">No data found</div>
        ) : (
          <div className="inline-block min-w-full align-middle">
            <table className="border-collapse divide-y divide-[#FBBF24] text-sm">
              <thead className="bg-[#9A3412] text-white text-xs md:text-sm">
                <tr>
                  <th className="px-3 py-2 text-left">Customer Name</th>
                  <th className="px-3 py-2 text-left hidden sm:table-cell">Email</th>
                  <th className="px-3 py-2 text-left hidden md:table-cell">Mobile</th>
                  <th className="px-3 py-2 text-left hidden lg:table-cell">Address</th>
                  <th className="px-3 py-2 text-left hidden lg:table-cell">Family Member Name</th>
                  <th className="px-3 py-2 text-left">Age</th>
                  <th className="px-3 py-2 text-left hidden sm:table-cell">Created At</th>
                  <th className="px-3 py-2 text-left">Price</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FEE2E2] text-gray-800">
                {requests.map((req) =>
                  req.variants.map((variant) => (
                    <tr key={variant._id} className="hover:bg-yellow-50">
                      <td className="px-3 py-2 break-words">{variant.userId?.fullName || 'N/A'}</td>
                      <td className="px-3 py-2 hidden sm:table-cell break-words max-w-[200px]">{variant.userId?.email || 'N/A'}</td>
                      <td className="px-3 py-2 hidden md:table-cell">{variant.userId?.mobileNumber || 'N/A'}</td>
                      <td className="px-3 py-2 hidden lg:table-cell break-words max-w-[250px]">{variant.userId?.address || 'N/A'}</td>
                      <td className="px-3 py-2 hidden lg:table-cell">
                        {req.purchaseFor?.isFamilyMember ? req.purchaseFor?.name : 'N/A'}
                      </td>
                      <td className="px-3 py-2">
                        {req.purchaseFor?.isFamilyMember ? req.purchaseFor?.age : variant.userId.age}
                      </td>
                      <td className="px-3 py-2 hidden sm:table-cell">
                        {new Date(req.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => openModal(req._id, variant._id, variant.actualPrice)}
                          className="text-blue-600 underline"
                        >
                          {variant.actualPrice}
                        </button>
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={req.status}
                          onChange={(e) => updateStatus(req._id, e.target.value)}
                          className={`px-2 py-1 rounded-md text-xs md:text-sm focus:outline-none ${
                            req.status === 'contacted' ||
                            req.status === 'payment-link-sended' ||
                            req.status === 'purchased'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          <option value="contacted">Contacted</option>
                          <option value="not-contacted">Not Contacted</option>
                          <option value="payment-link-sended">Payment Link Sended</option>
                          <option value="purchased">Purchased</option>
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        {req.status === 'purchased' && (
                          <button
                            onClick={() => openDeductModal(req._id)} // Open confirmation modal instead of directly deducting
                            className="text-red-600 underline"
                          >
                            Deduct Session
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-[#9A3412] text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-[#9A3412] font-semibold">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-[#9A3412] text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for Deducting Session */}
      {isDeductModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full sm:w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Session Deduction</h2>
            <p className="text-center">Are you sure you want to deduct this session?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={deductSession}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Confirm Deduction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Updating Price */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full sm:w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Update Price</h2>
            <div className="mb-4">
              <label htmlFor="new-price" className="block text-sm font-medium text-gray-700">
                New Price
              </label>
              <input
                type="number"
                id="new-price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter new price"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={updatePrice}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Update Price
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliteRequests;
