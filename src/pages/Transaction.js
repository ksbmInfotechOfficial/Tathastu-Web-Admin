// import React, { useState } from 'react';

// const TransactionPage = () => {
//   // Static transaction data with plan type and doctor name
//   const transactions = [
//     {
//       id: 'T001',
//       date: '2025-05-01',
//       description: 'Payment for Plan A',
//       amount: 150.0,
//       status: 'Completed',
//       doctorName: 'Dr. John Doe',
//       planType: 'Basic', // Added plan type
//     },
//     {
//       id: 'T002',
//       date: '2025-05-03',
//       description: 'Payment for Plan B',
//       amount: 200.0,
//       status: 'Pending',
//       doctorName: 'Dr. Emma Stone',
//       planType: 'Premium',
//     },
//     {
//       id: 'T003',
//       date: '2025-05-05',
//       description: 'Payment for Plan C',
//       amount: 300.0,
//       status: 'Completed',
//       doctorName: 'Dr. Liam Neeson',
//       planType: 'Standard', // Added plan type
//     },
//     {
//       id: 'T004',
//       date: '2025-05-07',
//       description: 'Refund for Plan A',
//       amount: -50.0,
//       status: 'Refunded',
//       doctorName: 'Dr. Ava Johnson',
//       planType: 'Basic',
//     },
//   ];

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-blue-900">Transaction History</h2>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow border border-blue-100">
//         <table className="min-w-full text-sm text-left text-gray-700">
//           <thead className="bg-blue-900 text-white">
//             <tr>
//               <th className="px-6 py-3">Transaction ID</th>
//               <th className="px-6 py-3">Date</th>
//               <th className="px-6 py-3">Doctor Name</th> {/* Added column for Doctor Name */}
//               <th className="px-6 py-3">Plan Type</th> {/* Added column for Plan Type */}
//               <th className="px-6 py-3">Description</th>
//               <th className="px-6 py-3">Amount</th>
//               <th className="px-6 py-3">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction) => (
//               <tr key={transaction.id} className="border-b hover:bg-blue-50">
//                 <td className="px-6 py-4">{transaction.id}</td>
//                 <td className="px-6 py-4">{transaction.date}</td>
//                 <td className="px-6 py-4">{transaction.doctorName}</td> {/* Display Doctor's Name */}
//                 <td className="px-6 py-4">{transaction.planType}</td> {/* Display Plan Type */}
//                 <td className="px-6 py-4">{transaction.description}</td>
//                 <td className="px-6 py-4">
//                   {transaction.amount > 0 ? (
//                     <span className="text-green-600">+${transaction.amount}</span>
//                   ) : (
//                     <span className="text-red-600">${transaction.amount}</span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-2 py-1 rounded-full ${
//                       transaction.status === 'Completed'
//                         ? 'bg-green-100 text-green-600'
//                         : transaction.status === 'Pending'
//                         ? 'bg-yellow-100 text-yellow-600'
//                         : 'bg-red-100 text-red-600'
//                     }`}
//                   >
//                     {transaction.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransactionPage;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TransactionPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const { data } = await axios.get('http://194.238.17.230:8001/api/admin/get_all_transaction', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (data.success) {
//           setTransactions(data.data);
//         } else {
//           console.error('Failed to fetch transactions:', data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching transactions:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [token]);

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-blue-900">Transaction History</h2>
//       </div>

//       {loading ? (
//         <div className="text-center text-gray-500 animate-pulse py-10">Loading...</div>
//       ) : transactions.length > 0 ? (
//         <div className="overflow-x-auto bg-white rounded-lg shadow border border-blue-100">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-blue-900 text-white">
//               <tr>
//                 <th className="px-6 py-3">ID</th>
//                 <th className="px-6 py-3">Doctor Name</th>
//                 <th className="px-6 py-3">Plan Type</th>
//                 <th className="px-6 py-3">Plan Name</th>
//                 <th className="px-6 py-3">Amount</th>
//                 <th className="px-6 py-3">Start Date</th>
//                 <th className="px-6 py-3">End Date</th>
//                 <th className="px-6 py-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction, i) => (
//                 <tr key={transaction._id} className="border-b hover:bg-blue-50">
//                   <td className="px-6 py-4">{transaction.paymentDetails?.paymentId || i+1}</td>
//                   <td className="px-6 py-4">{transaction.doctorId?.fullName || 'Unknown Doctor'}</td>
//                   <td className="px-6 py-4">{transaction.duration || 'N/A'}</td>
//                   <td className="px-6 py-4">{transaction.planName || 'Subscription Payment'}</td>
//                   <td className="px-6 py-4">
//                     {transaction.amount > 0 ? (
//                       <span className="text-green-600">+₹{transaction.amount}</span>
//                     ) : (
//                       <span className="text-red-600">₹{transaction.amount}</span>
//                     )}
//                   </td>
//                    <td className="px-6 py-4">{new Date(transaction.startDate).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">{new Date(transaction.endDate).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 py-1 rounded-full ${
//                         transaction.status === 'Completed'
//                           ? 'bg-green-100 text-green-600'
//                           : transaction.status === 'Pending'
//                           ? 'bg-yellow-100 text-yellow-600'
//                           : 'bg-red-100 text-red-600'
//                       }`}
//                     >
//                       {transaction.status || 'Completed'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center text-gray-600 mt-10">No transactions found.</div>
//       )}
//     </div>
//   );
// };

// export default TransactionPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('');
  const [duration, setDuration] = useState('');
  const [doctorName, setDoctorName] = useState(''); // Added doctorName filter
  
  const token = localStorage.getItem('token');
  
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(planName && { planName }),
        ...(planType && { planType }),
        ...(duration && { duration }),
        ...(doctorName && { doctorName }), // Passing doctorName filter
      });
      
      const { data } = await axios.get(
        `http://194.238.17.230:8001/api/admin/get_all_transaction?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setTransactions(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        console.error('Failed to fetch transactions:', data.message);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTransactions();
  }, [token, page, planName, planType, duration, doctorName]); // Re-run on doctorName change
  
  return (
    <div className="p-6 bg-[#F7FBFF] min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900">Transaction History</h2>
      </div>

      {/* === Filter Controls === */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* <input
          type="text"
          placeholder="Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="px-4 py-2 border rounded-md"
        /> */}
        <select
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Plan Name</option>
          <option value="starter">Starter</option>
          <option value="Clinic Plan">Clinic</option>
        </select>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Durations</option>
          <option value="monthly">Monthly</option>
          <option value="half-yearly">Half-Yearly</option>
          <option value="yearly">Yearly</option>
        </select>
        {/* <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="px-4 py-2 border rounded-md"
        /> */}
      </div>

      {/* === Table === */}
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse py-10">Loading...</div>
      ) : transactions.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-blue-100">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Doctor Name</th>
                  <th className="px-6 py-3">Plan Type</th>
                  <th className="px-6 py-3">Plan Name</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Start Date</th>
                  <th className="px-6 py-3">End Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, i) => (
                  <tr key={transaction._id} className="border-b hover:bg-blue-50">
                    <td className="px-6 py-4">{transaction.paymentDetails?.paymentId || i + 1}</td>
                    <td className="px-6 py-4">{transaction.doctorId?.fullName || 'Unknown Doctor'}</td>
                    <td className="px-6 py-4">{transaction.duration || 'N/A'}</td>
                    <td className="px-6 py-4">{transaction.planName || 'Subscription Payment'}</td>
                    <td className="px-6 py-4">
                      <span className="text-green-600">+₹{transaction.amount || 0}</span>
                    </td>
                    <td className="px-6 py-4">{new Date(transaction.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(transaction.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-600">
                        {transaction.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* === Pagination === */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-1 rounded ${
                page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Prev
            </button>
            <span className="text-gray-600">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
              className={`px-4 py-1 rounded ${
                page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600 mt-10">No transactions found.</div>
      )}
    </div>
  );
};

export default TransactionPage;

