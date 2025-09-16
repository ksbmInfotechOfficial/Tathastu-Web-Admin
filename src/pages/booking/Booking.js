// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { APIURL } from '../../redux/api'

// const Booking = () => {
//   const [bookings, setBookings] = useState([])
//   const [page, setPage] = useState(1)
//   const [limit] = useState(10)
//   const [totalPages, setTotalPages] = useState(1)

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${APIURL}/admin/get_all_bookings`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         params: { page, limit },
//       })
//       setBookings(res.data.data || [])
//       setTotalPages(res.data.totalPages || 1)
//     } catch (error) {
//       console.error('Error fetching bookings:', error)
//     }
//   }

//   useEffect(() => {
//     fetchBookings()
//   }, [page])

//   return (
//     <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
//       <h1 className="text-3xl font-bold text-[#9A3412] mb-6">Booking List</h1>

//       {bookings.length === 0 ? (
//         <p className="text-[#9A3412]">No bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto border border-[#D97706] rounded-lg shadow bg-white">
//           <table className="min-w-full divide-y divide-[#FBBF24]">
//             <thead className="bg-[#9A3412] text-white">
//               <tr>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Session Type</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Session Name</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Urgency</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Add-Ons</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">User</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Status</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Payment</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#FEE2E2]">
//               {bookings.map((b, i) => (
//                 <tr key={b._id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FEE2E2]'}>
//                   <td className="px-4 py-2 text-[#7C2D12]">{b.sessionType}</td>
//                   <td className="px-4 py-2 text-gray-700">{b.sessionName}</td>
//                   <td className="px-4 py-2 text-gray-700">{b.urgency}</td>
//                   <td className="px-4 py-2 text-gray-700">
//                     {b.selectedAddOns?.join(', ') || 'None'}
//                   </td>
//                   <td className="px-4 py-2 text-gray-700">
//                     {b.user?.name} <br />
//                     <span className="text-sm text-gray-500">{b.user?.phone}</span>
//                   </td>
//                   <td className="px-4 py-2 text-gray-700 capitalize">{b.status}</td>
//                   <td className="px-4 py-2 text-gray-700">
//                     ₹{b.payment?.amount || 0} <br />
//                     <span className="text-sm text-gray-500">{b.payment?.status}</span>
//                   </td>
//                   <td className="px-4 py-2 text-gray-500">
//                     {new Date(b.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center items-center space-x-4">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           className="px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <span className="text-[#9A3412]">
//           Page <strong>{page}</strong> of <strong>{totalPages}</strong>
//         </span>
//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           className="px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Booking




// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { APIURL } from '../../redux/api'

// const Booking = () => {
//   const [bookings, setBookings] = useState([])
//   const [page, setPage] = useState(1)
//   const [limit] = useState(10)
//   const [totalPages, setTotalPages] = useState(1)

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${APIURL}/admin/get_all_bookings`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         params: { page, limit },
//       })
//       setBookings(res.data.data || [])
//       setTotalPages(res.data.totalPages || 1)
//     } catch (error) {
//       console.error('Error fetching bookings:', error)
//     }
//   }

//   useEffect(() => {
//     fetchBookings()
//   }, [page])

//   return (
//     <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
//       <h1 className="text-3xl font-bold text-[#9A3412] mb-6">📖 Booking List</h1>

//       {bookings.length === 0 ? (
//         <p className="text-[#9A3412]">No bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto border border-[#D97706] rounded-lg shadow bg-white">
//           <table className="min-w-full divide-y divide-[#FBBF24]">
//             <thead className="bg-[#9A3412] text-white">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Session Type</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Session Name</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Urgency</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Add-Ons</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">User</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Payment</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#FEE2E2]">
//               {bookings.map((b, i) => (
//                 <tr
//                   key={b._id}
//                   className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#FEE2E2]'} hover:bg-[#fde68a33] transition-all`}
//                 >
//                   <td className="px-4 py-3 text-[#7C2D12] font-medium">{b.sessionType}</td>
//                   <td className="px-4 py-3 text-gray-700">{b.sessionName}</td>
//                   <td className="px-4 py-3 text-gray-700">{b.urgency}</td>
//                   <td className="px-4 py-3">
//                     {b.selectedAddOns && b.selectedAddOns.length > 0 ? (
//                       <div className="flex flex-wrap gap-2">
//                         {b.selectedAddOns.map((add, idx) => (
//                           <span
//                             key={idx}
//                             className="text-xs px-2 py-1 bg-[#FBBF24] text-[#7C2D12] rounded-full"
//                           >
//                             {add}
//                           </span>
//                         ))}
//                       </div>
//                     ) : (
//                       <span className="text-gray-500 text-sm italic">None</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-3 text-gray-700">
//                     {b.user?.name}
//                     <br />
//                     <span className="text-sm text-gray-500">{b.user?.phone}</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full font-medium ${
//                         b.status === 'confirmed'
//                           ? 'bg-green-100 text-green-700'
//                           : b.status === 'cancelled'
//                           ? 'bg-red-100 text-red-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className="text-gray-700 font-semibold">₹{b.payment?.amount || 0}</span>
//                     <br />
//                     <span
//                       className={`text-xs font-medium ${
//                         b.payment?.status === 'paid'
//                           ? 'text-green-700'
//                           : b.payment?.status === 'failed'
//                           ? 'text-red-700'
//                           : 'text-yellow-700'
//                       }`}
//                     >
//                       {b.payment?.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-gray-500">
//                     {new Date(b.createdAt).toLocaleDateString('en-IN', {
//                       year: 'numeric',
//                       month: 'short',
//                       day: 'numeric',
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center items-center space-x-4">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           className="px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <span className="text-[#9A3412]">
//           Page <strong>{page}</strong> of <strong>{totalPages}</strong>
//         </span>
//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           className="px-4 py-2 rounded bg-[#9A3412] text-white hover:bg-[#7C2D12] disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Booking




// import React, { useEffect, useState, useMemo } from 'react'
// import axios from 'axios'
// import { CSVLink } from 'react-csv'
// import { jsPDF } from 'jspdf'
// import autoTable from 'jspdf-autotable'
// import { APIURL } from '../../redux/api'

// const Booking = () => {
//   const [bookings, setBookings] = useState([])
//   const [page, setPage] = useState(1)
//   const [limit] = useState(10)
//   const [totalPages, setTotalPages] = useState(1)

//   // Filters & sorting
//   const [statusFilter, setStatusFilter] = useState('')
//   const [sessionFilter, setSessionFilter] = useState('')
//   const [paymentFilter, setPaymentFilter] = useState('')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [sortBy, setSortBy] = useState('createdAt')
//   const [sortOrder, setSortOrder] = useState('asc')

//   // Modal
//   const [selectedBooking, setSelectedBooking] = useState(null)
//   const [modalOpen, setModalOpen] = useState(false)

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${APIURL}/admin/get_all_bookings`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         params: { page, limit }
//       })
//       setBookings(res.data.data || [])
//       setTotalPages(res.data.totalPages || 1)
//     } catch (error) {
//       console.error('Error fetching bookings:', error)
//     }
//   }

//   useEffect(() => { fetchBookings() }, [page])

//   // Combine filter, search, sort
//   const processed = useMemo(() => {
//     let data = [...bookings]
//     if (statusFilter) data = data.filter(b => b.status === statusFilter)
//     if (sessionFilter) data = data.filter(b => b.sessionType === sessionFilter)
//     if (paymentFilter) data = data.filter(b => b.payment?.status === paymentFilter)
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       data = data.filter(b =>
//         b.user?.name.toLowerCase().includes(term) ||
//         b.user?.phone.includes(term)
//       )
//     }
//     data.sort((a, b) => {
//       let va = a[sortBy]
//       let vb = b[sortBy]
//       if (sortBy === 'amount') {
//         va = a.payment?.amount || 0
//         vb = b.payment?.amount || 0
//       }
//       if (sortBy === 'createdAt') {
//         va = new Date(a.createdAt)
//         vb = new Date(b.createdAt)
//       }
//       return va < vb ? (sortOrder === 'asc' ? -1 : 1) : va > vb ? (sortOrder === 'asc' ? 1 : -1) : 0
//     })
//     return data
//   }, [bookings, statusFilter, sessionFilter, paymentFilter, searchTerm, sortBy, sortOrder])

//   // Paginate
//   const paginated = useMemo(() => {
//     const start = (page - 1) * limit
//     return processed.slice(start, start + limit)
//   }, [processed, page, limit])

//   // Export PDF
//   const exportToPdf = () => {
//     const doc = new jsPDF()
//     const head = [['Type','Name','Urgency','Add-Ons','User','Status','Payment','Date']]
//     const body = processed.map(b => [
//       b.sessionType,
//       b.sessionName,
//       b.urgency,
//       b.selectedAddOns?.join(', ') || 'None',
//       b.user?.name,
//       b.status,
//       b.payment?.status,
//       new Date(b.createdAt).toLocaleDateString('en-IN')
//     ])
//     autoTable(doc, { head, body })
//     doc.save('bookings.pdf')
//   }

//   const openModal = booking => { setSelectedBooking(booking); setModalOpen(true) }
//   const closeModal = () => { setSelectedBooking(null); setModalOpen(false) }

//   const handleSort = col => {
//     if (sortBy === col) setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
//     else { setSortBy(col); setSortOrder('asc') }
//   }

//   const csvHeaders = [
//     { label: 'Session Type', key: 'sessionType' },
//     { label: 'Session Name', key: 'sessionName' },
//     { label: 'Urgency', key: 'urgency' },
//     { label: 'Add-Ons', key: 'selectedAddOns' },
//     { label: 'User Name', key: 'user.name' },
//     { label: 'Status', key: 'status' },
//     { label: 'Payment Status', key: 'payment.status' },
//     { label: 'Date', key: 'createdAt' }
//   ]

//   return (
//     <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
//       <h1 className="text-3xl font-bold text-[#9A3412] mb-4">Booking List</h1>

//       {/* Filters & Search */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="p-2 border rounded">
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//         <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} className="p-2 border rounded">
//           <option value="">All Sessions</option>
//           <option value="telephonic">Telephonic</option>
//           <option value="face-to-face">Face-to-face</option>
//         </select>
//         <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)} className="p-2 border rounded">
//           <option value="">All Payments</option>
//           <option value="paid">Paid</option>
//           <option value="pending">Pending</option>
//           <option value="failed">Failed</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search by name or phone"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="p-2 border rounded flex-1"
//         />
//         <button onClick={exportToPdf} className="px-4 py-2 bg-[#9A3412] text-white rounded">Export PDF</button>
//         <CSVLink
//           data={processed.map(b => ({
//             ...b,
//             selectedAddOns: b.selectedAddOns?.join(', '),
//             'user.name': b.user?.name,
//             'payment.status': b.payment?.status,
//             createdAt: new Date(b.createdAt).toLocaleDateString('en-IN')
//           }))}
//           headers={csvHeaders}
//           filename="bookings.csv"
//           className="px-4 py-2 bg-[#FBBF24] text-[#7C2D12] rounded"
//         >
//           Export CSV
//         </CSVLink>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto border rounded shadow bg-white">
//         <table className="min-w-full divide-y divide-[#FBBF24]">
//           <thead className="bg-[#9A3412] text-white">
//             <tr>
//               {['sessionType','sessionName','urgency','selectedAddOns','user','status','payment','createdAt'].map(col => (
//                 <th
//                   key={col}
//                   className="px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer"
//                   onClick={() => handleSort(col)}
//                 >
//                   {col === 'createdAt'
//                     ? 'Date'
//                     : col === 'selectedAddOns'
//                     ? 'Add-Ons'
//                     : col === 'user'
//                     ? 'User'
//                     : col.charAt(0).toUpperCase() + col.slice(1)
//                   }
//                   {sortBy === col && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#FEE2E2]">
//             {paginated.map((b, i) => (
//               <tr
//                 key={b._id}
//                 className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#FEE2E2]'} hover:bg-[#fde68a33] cursor-pointer`}
//                 onClick={() => openModal(b)}
//               >
//                 <td className="px-4 py-3 font-medium">{b.sessionType}</td>
//                 <td className="px-4 py-3">{b.sessionName}</td>
//                 <td className="px-4 py-3">{b.urgency}</td>
//                 <td className="px-4 py-3">{b.selectedAddOns?.join(', ') || <span className="italic text-gray-500">None</span>}</td>
//                 <td className="px-4 py-3">{b.user?.name}<br /><span className="text-sm text-gray-500">{b.user?.phone}</span></td>
//                 <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span></td>
//                 <td className="px-4 py-3">₹{b.payment?.amount || 0}<br /><span className="text-xs font-medium">{b.payment?.status}</span></td>
//                 <td className="px-4 py-3">{new Date(b.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center items-center space-x-4">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage(p => Math.max(1, p - 1))}
//           className="px-4 py-2 bg-[#9A3412] text-white rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//           className="px-4 py-2 bg-[#9A3412] text-white rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* Detail Modal */}
//       {modalOpen && selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
//             <p><strong>Session:</strong> {selectedBooking.sessionName}</p>
//             <p><strong>Type:</strong> {selectedBooking.sessionType}</p>
//             <p><strong>Urgency:</strong> {selectedBooking.urgency}</p>
//             <p><strong>Add-Ons:</strong> {selectedBooking.selectedAddOns?.join(', ') || 'None'}</p>
//             <p><strong>Status:</strong> {selectedBooking.status}</p>
//             <p><strong>Payment:</strong> ₹{selectedBooking.payment?.amount} ({selectedBooking.payment?.status})</p>
//             <p><strong>Transaction ID:</strong> {selectedBooking.payment?.transactionId || 'N/A'}</p>
//             <p><strong>Payment Date:</strong> {selectedBooking.payment?.date ? new Date(selectedBooking.payment.date).toLocaleString('en-IN') : 'N/A'}</p>
//             <p><strong>Notes:</strong> {selectedBooking.notes || 'None'}</p>
//             <button onClick={closeModal} className="mt-4 px-4 py-2 bg-[#9A3412] text-white rounded">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Booking





import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { APIURL } from '../../redux/api'

const Booking = () => {
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [statusFilter, setStatusFilter] = useState('')
  const [sessionFilter, setSessionFilter] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  const [selectedBooking, setSelectedBooking] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

 const fetchBookings = async () => {
  try {
    const res = await axios.get(`${APIURL}/admin/get_all_bookings`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { page, limit }
    })

    setBookings(res.data.data || [])

    // FIX: Calculate total pages based on total and limit
    const totalCount = res.data.total || 0
    setTotalPages(Math.ceil(totalCount / limit))
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}


  useEffect(() => { fetchBookings() }, [page])

  const processed = useMemo(() => {
    let data = [...bookings]
    if (statusFilter) data = data.filter(b => b.status === statusFilter)
    if (sessionFilter) data = data.filter(b => b.sessionType === sessionFilter)
    if (paymentFilter) data = data.filter(b => b.payment?.status === paymentFilter)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      data = data.filter(b =>
        b.user?.name.toLowerCase().includes(term) ||
        b.user?.phone.includes(term)
      )
    }
    data.sort((a, b) => {
      let va = a[sortBy]
      let vb = b[sortBy]
      if (sortBy === 'amount') {
        va = a.payment?.amount || 0
        vb = b.payment?.amount || 0
      }
      if (sortBy === 'createdAt') {
        va = new Date(a.createdAt)
        vb = new Date(b.createdAt)
      }
      return va < vb ? (sortOrder === 'asc' ? -1 : 1) : va > vb ? (sortOrder === 'asc' ? 1 : -1) : 0
    })
    return data
  }, [bookings, statusFilter, sessionFilter, paymentFilter, searchTerm, sortBy, sortOrder])

  // const paginated = useMemo(() => {
  //   const start = (page - 1) * limit
  //   return processed.slice(start, start + limit)
  // }, [processed, page, limit])
  const paginated = processed


  const exportToPdf = () => {
    const doc = new jsPDF()
    const head = [['Type','Name','Urgency','Add-Ons','User','Status','Payment','Date']]
    const body = processed.map(b => [
      b.sessionType,
      b.sessionName,
      b.urgency,
      b.selectedAddOns?.join(', ') || 'None',
      b.user?.name,
      b.status,
      b.payment?.status,
      new Date(b.createdAt).toLocaleDateString('en-IN')
    ])
    autoTable(doc, { head, body })
    doc.save('bookings.pdf')
  }

  const openModal = booking => {
    setSelectedBooking({
      ...booking,
      scheduledDate: '',
      startTime: '',
      endTime: ''
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedBooking(null)
    setModalOpen(false)
  }

  const handleSort = col => {
    if (sortBy === col) setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortOrder('asc') }
  }

  const scheduleSession = async (booking) => {
    const { _id, scheduledDate, startTime, endTime } = booking
    if (!scheduledDate || !startTime) {
      return alert("Please fill all fields.")
    }

    try {
      await axios.put(
        `https://apitathastu.astroone.in/api/admin/bookings/${_id}/schedule`,
        { date: scheduledDate, startTime, endTime },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      alert("Session scheduled successfully.")
      closeModal()
      fetchBookings()
    } catch (error) {
      console.error("Error scheduling session:", error)
      alert("Failed to schedule session.")
    }
  }

  const csvHeaders = [
    { label: 'Session Type', key: 'sessionType' },
    { label: 'Session Name', key: 'sessionName' },
    { label: 'Urgency', key: 'urgency' },
    { label: 'Add-Ons', key: 'selectedAddOns' },
    { label: 'User Name', key: 'user.name' },
    { label: 'Status', key: 'status' },
    { label: 'Payment Status', key: 'payment.status' },
    { label: 'Date', key: 'createdAt' }
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
      <h1 className="text-3xl font-bold text-[#9A3412] mb-4">Booking List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All Sessions</option>
          <option value="telephonic">Telephonic</option>
          <option value="face-to-face">Face-to-face</option>
        </select>
        <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All Payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button onClick={exportToPdf} className="px-4 py-2 bg-[#9A3412] text-white rounded">Export PDF</button>
        <CSVLink
          data={processed.map(b => ({
            ...b,
            selectedAddOns: b.selectedAddOns?.join(', '),
            'user.name': b.user?.name,
            'payment.status': b.payment?.status,
            createdAt: new Date(b.createdAt).toLocaleDateString('en-IN')
          }))}
          headers={csvHeaders}
          filename="bookings.csv"
          className="px-4 py-2 bg-[#FBBF24] text-[#7C2D12] rounded"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow bg-white">
        <table className="min-w-full divide-y divide-[#FBBF24]">
          <thead className="bg-[#9A3412] text-white">
            <tr>
              {['sessionType','sessionName','urgency','selectedAddOns','user','status','payment','createdAt'].map(col => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  {col === 'createdAt'
                    ? 'Date'
                    : col === 'selectedAddOns'
                    ? 'Add-Ons'
                    : col === 'user'
                    ? 'User'
                    : col.charAt(0).toUpperCase() + col.slice(1)
                  }
                  {sortBy === col && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FEE2E2]">
            {processed.map((b, i) => (
              <tr
                key={b._id}
                className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#FEE2E2]'} hover:bg-[#fde68a33] cursor-pointer`}
                onClick={() => openModal(b)}
              >
                <td className="px-4 py-3 font-medium">{b.sessionType}</td>
                <td className="px-4 py-3">{b.sessionName}</td>
                <td className="px-4 py-3">{b.urgency}</td>
                <td className="px-4 py-3">{b.selectedAddOns?.join(', ') || <span className="italic text-gray-500">None</span>}</td>
                <td className="px-4 py-3">{b.user?.name}<br /><span className="text-sm text-gray-500">{b.user?.phone}</span></td>
                <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span></td>
                <td className="px-4 py-3">₹{b.payment?.amount || 0}<br /><span className="text-xs font-medium">{b.payment?.status}</span></td>
                <td className="px-4 py-3">{new Date(b.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    {/* Pagination */}
<div className="mt-6 flex justify-center items-center space-x-2 flex-wrap">
  <button
    disabled={page <= 1}
    onClick={() => setPage(p => Math.max(1, p - 1))}
    className="px-3 py-1 bg-[#9A3412] text-white rounded disabled:opacity-50"
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, i) => {
    const pg = i + 1
    const isNear = Math.abs(pg - page) <= 2
    const isEdge = pg === 1 || pg === totalPages
    const showDotsBefore = pg === page - 3
    const showDotsAfter = pg === page + 3

    if (isNear || isEdge) {
      return (
        <button
          key={pg}
          onClick={() => setPage(pg)}
          className={`px-3 py-1 rounded ${pg === page ? 'bg-[#FBBF24] text-[#7C2D12] font-bold' : 'bg-gray-200 text-black'}`}
        >
          {pg}
        </button>
      )
    }

    if (showDotsBefore || showDotsAfter) {
      return <span key={`dots-${pg}`} className="px-2">...</span>
    }

    return null
  })}

  <button
    disabled={page >= totalPages}
    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
    className="px-3 py-1 bg-[#9A3412] text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>


      {/* Schedule Modal */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Schedule Session</h2>
            <p><strong>User:</strong> {selectedBooking.user?.name}</p>
            <p><strong>Session:</strong> {selectedBooking.sessionName}</p>

            <div className="mt-4">
              <label className="block text-sm font-medium">Date</label>
            <input
  type="date"
  value={selectedBooking.scheduledDate}
  min={new Date().toISOString().split("T")[0]} // ⬅️ This prevents past dates
  onChange={e => setSelectedBooking(prev => ({ ...prev, scheduledDate: e.target.value }))}
  className="w-full border p-2 rounded mb-2"
/>

              <label className="block text-sm font-medium">Start Time</label>
              <input type="time" value={selectedBooking.startTime} onChange={e => setSelectedBooking(prev => ({ ...prev, startTime: e.target.value }))} className="w-full border p-2 rounded mb-2" />

              <label className="block text-sm font-medium">End Time</label>
              <input type="time" value={selectedBooking.endTime} onChange={e => setSelectedBooking(prev => ({ ...prev, endTime: e.target.value }))} className="w-full border p-2 rounded mb-4" />

              <button onClick={() => scheduleSession(selectedBooking)} className="w-full px-4 py-2 bg-green-600 text-white rounded">Schedule</button>
            </div>

            <button onClick={closeModal} className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-800 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking
