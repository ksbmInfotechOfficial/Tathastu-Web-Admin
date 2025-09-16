// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const ScheduledSessions = () => {
//   const [sessions, setSessions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeTab, setActiveTab] = useState('scheduled')
//   const [updating, setUpdating] = useState(null)

//   const [page, setPage] = useState(1)
//   const [limit] = useState(10)
//   const [totalPages, setTotalPages] = useState(1)

//   useEffect(() => {
//     setPage(1) // reset to first page on tab change
//   }, [activeTab])

//   useEffect(() => {
//     fetchSessions()
//   }, [activeTab, page])

//   const fetchSessions = async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       const endpoint =
//         activeTab === 'scheduled'
//           ? 'https://apitathastu.astroone.in/api/admin/bookings/scheduled'
//           : 'https://apitathastu.astroone.in/api/admin/bookings/completed'

//       const res = await axios.get(endpoint, {
//         params: { page, limit },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       })

//       setSessions(res.data.data || [])
//       setTotalPages(res.data.totalPages || 1)
//     } catch (err) {
//       setError('Failed to load sessions')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const markAsCompleted = async (bookingId) => {
//     try {
//       setUpdating(bookingId)
//       await axios.patch(
//         `https://apitathastu.astroone.in/api/admin/bookings/${bookingId}/complete`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       )
//       fetchSessions()
//     } catch (err) {
//       alert('Failed to update status.')
//     } finally {
//       setUpdating(null)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-[#9A3412] mb-6">Sessions</h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-4">
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === 'scheduled'
//               ? 'bg-[#9A3412] text-white'
//               : 'bg-white text-[#9A3412] border border-[#9A3412]'
//           }`}
//           onClick={() => setActiveTab('scheduled')}
//         >
//           Scheduled
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === 'completed'
//               ? 'bg-[#9A3412] text-white'
//               : 'bg-white text-[#9A3412] border border-[#9A3412]'
//           }`}
//           onClick={() => setActiveTab('completed')}
//         >
//           Completed
//         </button>
//       </div>

//       {loading && <p className="text-gray-600">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <>
//           <div className="overflow-x-auto bg-white shadow rounded-lg">
//             <table className="min-w-full table-auto divide-y divide-gray-200">
//               <thead className="bg-[#9A3412] text-white">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium">Session Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium">User</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium">Start Time</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium">End Time</th>
//                   {activeTab === 'scheduled' && (
//                     <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {sessions.length === 0 ? (
//                   <tr>
//                     <td colSpan={activeTab === 'scheduled' ? 6 : 5} className="px-4 py-4 text-center text-gray-500">
//                       No {activeTab} sessions found.
//                     </td>
//                   </tr>
//                 ) : (
//                   sessions.map((s) => (
//                     <tr key={s._id} className="hover:bg-yellow-50">
//                       <td className="px-4 py-3">{s.sessionName || '-'}</td>
//                       <td className="px-4 py-3">
//                         {s.user?.name}<br />
//                         <span className="text-sm text-gray-500">{s.user?.phone}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {s.scheduledSession?.date
//                           ? new Date(s.scheduledSession.date).toLocaleDateString('en-IN')
//                           : '-'}
//                       </td>
//                       <td className="px-4 py-3">{s.scheduledSession?.startTime || '-'}</td>
//                       <td className="px-4 py-3">{s.scheduledSession?.endTime || '-'}</td>
//                       {activeTab === 'scheduled' && (
//                         <td className="px-4 py-3">
//                           <button
//                             className={`px-3 py-1 text-sm rounded ${
//                               updating === s._id
//                                 ? 'bg-gray-400 cursor-not-allowed'
//                                 : 'bg-green-600 hover:bg-green-700'
//                             } text-white`}
//                             disabled={updating === s._id}
//                             onClick={() => markAsCompleted(s._id)}
//                           >
//                             {updating === s._id ? 'Updating...' : 'Mark as Completed'}
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center mt-6 gap-4">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page <= 1}
//               className="px-4 py-2 bg-[#9A3412] text-white rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="text-[#9A3412] font-semibold">{`Page ${page} of ${totalPages}`}</span>
//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page >= totalPages}
//               className="px-4 py-2 bg-[#9A3412] text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// export default ScheduledSessions



import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ScheduledSessions = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('scheduled')
  const [updating, setUpdating] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sessionToReschedule, setSessionToReschedule] = useState(null)
  const [reason, setReason] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newStartTime, setNewStartTime] = useState('')
  const [newEndTime, setNewEndTime] = useState('')

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setPage(1) // reset to first page on tab change
  }, [activeTab])

  useEffect(() => {
    fetchSessions()
  }, [activeTab, page])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      setError(null)

      const endpoint =
        activeTab === 'scheduled'
          ? 'https://apitathastu.astroone.in/api/admin/bookings/scheduled'
          : 'https://apitathastu.astroone.in/api/admin/bookings/completed'

      const res = await axios.get(endpoint, {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setSessions(res.data.data || [])
      setTotalPages(res.data.totalPages || 1)
    } catch (err) {
      setError('Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  const markAsCompleted = async (bookingId) => {
    try {
      setUpdating(bookingId)
      await axios.patch(
        `https://apitathastu.astroone.in/api/admin/bookings/${bookingId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      fetchSessions() // Refresh session list after marking as completed
    } catch (err) {
      alert('Failed to update status.')
    } finally {
      setUpdating(null)
    }
  }

  const openRescheduleModal = (session) => {
    setSessionToReschedule(session)
    setIsModalOpen(true)
    setNewDate(new Date(session.scheduledSession.date).toLocaleDateString('en-CA')) // Use 'en-CA' for date input compatibility
    setNewStartTime(session.scheduledSession.startTime)
    setNewEndTime(session.scheduledSession.endTime)
    setReason(session.scheduledSession.rescheduleReason)
  }

  const closeRescheduleModal = () => {
    setIsModalOpen(false)
    setSessionToReschedule(null)
    setReason('')
    setNewDate('')
    setNewStartTime('')
    setNewEndTime('')
  }

  const handleReschedule = async () => {
    try {
      const rescheduleData = {
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
        reason: reason,
      }
      await axios.put(
        `https://apitathastu.astroone.in/api/admin/bookings/${sessionToReschedule._id}/re_schedule`,
        rescheduleData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      fetchSessions() // Refresh the session list after successful reschedule
      closeRescheduleModal() // Close the modal after rescheduling
    } catch (err) {
      alert('Failed to reschedule the session.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] p-6">
      <h1 className="text-3xl font-bold text-[#9A3412] mb-6">Sessions</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'scheduled'
              ? 'bg-[#9A3412] text-white'
              : 'bg-white text-[#9A3412] border border-[#9A3412]'
          }`}
          onClick={() => setActiveTab('scheduled')}
        >
          Scheduled
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'completed'
              ? 'bg-[#9A3412] text-white'
              : 'bg-white text-[#9A3412] border border-[#9A3412]'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-[#9A3412] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Session Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Start Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">End Time</th>
                  {activeTab === 'scheduled' && (
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === 'scheduled' ? 6 : 5} className="px-4 py-4 text-center text-gray-500">
                      No {activeTab} sessions found.
                    </td>
                  </tr>
                ) : (
                  sessions.map((s) => (
                    <tr key={s._id} className="hover:bg-yellow-50">
                      <td className="px-4 py-3">{s.sessionName || '-'}</td>
                      <td className="px-4 py-3">
                        {s.user?.name}<br />
                        <span className="text-sm text-gray-500">{s.user?.phone}</span>
                      </td>
                      <td className="px-4 py-3">
                        {s.scheduledSession?.date
                          ? new Date(s.scheduledSession.date).toLocaleDateString('en-IN')
                          : '-'}
                      </td>
                      <td className="px-4 py-3">{s.scheduledSession?.startTime || '-'}</td>
                      <td className="px-4 py-3">{s.scheduledSession?.endTime || '-'}</td>
                     {activeTab === 'scheduled' && (
  <td className="px-4 py-3">
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 text-sm rounded ${
          updating === s._id
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
        disabled={updating === s._id}
        onClick={() => openRescheduleModal(s)}
      >
        {updating === s._id ? 'Updating...' : 'Reschedule'}
      </button>
      <button
        className={`px-3 py-1 text-sm rounded ${
          updating === s._id
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        } text-white`}
        disabled={updating === s._id}
        onClick={() => markAsCompleted(s._id)}
      >
        {updating === s._id ? 'Updating...' : 'Mark as Completed'}
      </button>
    </div>
  </td>
)}

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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
        </>
      )}

      {/* Reschedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reschedule Session</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows="3"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeRescheduleModal}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScheduledSessions

