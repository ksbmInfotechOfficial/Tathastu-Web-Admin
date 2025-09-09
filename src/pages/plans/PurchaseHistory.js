// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { CSVLink } from 'react-csv';

// const PurchaseHistory = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get('https://tathashtuapi.ksdelhi.net/api/admin/get_all_purchase_history', {
//         params: { page, limit },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setData(res.data.data || []);
//       setTotalPages(res.data.pagination?.totalPages || 1);
//     } catch (err) {
//       console.error('Failed to fetch purchase history:', err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, [page]);

//   const exportToPdf = () => {
//     const doc = new jsPDF();
//     const head = [['Name', 'Mobile', 'Email', 'Package', 'Type', 'Session Length', 'Price', 'Date']];
//     const body = data.map(item => [
//       item.userId?.fullName,
//       item.userId?.mobileNumber,
//       item.userId?.email,
//       item.packageName,
//       item.schedulingType,
//       item.sessionLength,
//       `₹${item.price}`,
//       new Date(item.purchaseDate).toLocaleDateString('en-IN'),
//     ]);
//     autoTable(doc, { head, body });
//     doc.save('purchase-history.pdf');
//   };

//   const csvHeaders = [
//     { label: 'Name', key: 'userId.fullName' },
//     { label: 'Mobile', key: 'userId.mobileNumber' },
//     { label: 'Email', key: 'userId.email' },
//     { label: 'Package', key: 'packageName' },
//     { label: 'Scheduling Type', key: 'schedulingType' },
//     { label: 'Session Length', key: 'sessionLength' },
//     { label: 'Price', key: 'price' },
//     { label: 'Date', key: 'purchaseDate' },
//   ];

//   return (
//     <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
//       {/* Title and Export buttons container */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-[#9A3412]">Purchase History</h1>

//         {/* Export Buttons */}
//         <div className="flex gap-6">
//           <button 
//             onClick={exportToPdf} 
//             className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md hover:bg-[#7C2D12] transition-all duration-300"
//           >
//             Export PDF
//           </button>
//           <CSVLink
//             data={data.map(r => ({
//               ...r,
//               'userId.fullName': r.userId?.fullName,
//               'userId.mobileNumber': r.userId?.mobileNumber,
//               'userId.email': r.userId?.email,
//               purchaseDate: new Date(r.purchaseDate).toLocaleDateString('en-IN'),
//             }))}
//             headers={csvHeaders}
//             filename="purchase-history.csv"
//             className="px-6 py-3 bg-[#FBBF24] text-[#7C2D12] rounded-lg shadow-md hover:bg-[#D97706] transition-all duration-300"
//           >
//             Export CSV
//           </CSVLink>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
//         <table className="min-w-full divide-y divide-[#FBBF24]">
//           <thead className="bg-[#9A3412] text-white">
//             <tr>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Mobile</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-left">Package</th>
//               <th className="px-4 py-3 text-left">Type</th>
//               <th className="px-4 py-3 text-left">Session</th>
//               <th className="px-4 py-3 text-left">Price</th>
//               <th className="px-4 py-3 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#FEE2E2]">
//             {data.map(item => (
//               <tr key={item._id} className="hover:bg-[#fde68a33] transition-all">
//                 <td className="px-4 py-4">{item.userId?.fullName}</td>
//                 <td className="px-4 py-4">{item.userId?.mobileNumber}</td>
//                 <td className="px-4 py-4">{item.userId?.email}</td>
//                 <td className="px-4 py-4">{item.packageName}</td>
//                 <td className="px-4 py-4">{item.schedulingType}</td>
//                 <td className="px-4 py-4">{item.sessionLength}</td>
//                 <td className="px-4 py-4">₹{item.price}</td>
//                 <td className="px-4 py-4">{new Date(item.purchaseDate).toLocaleDateString('en-IN')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-8 flex justify-center items-center space-x-6">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage(p => Math.max(1, p - 1))}
//           className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md disabled:opacity-50 transition-all duration-300"
//         >
//           Previous
//         </button>
//         <span className="text-lg text-[#9A3412]">Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//           className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md disabled:opacity-50 transition-all duration-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseHistory;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { CSVLink } from 'react-csv';

// const PurchaseHistory = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState('');

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get('https://tathashtuapi.ksdelhi.net/api/admin/get_all_purchase_history', {
//         params: { page, limit, search },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setData(res.data.data || []);
//       setTotalPages(res.data.pagination?.totalPages || 1);
//     } catch (err) {
//       console.error('Failed to fetch purchase history:', err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, [page, search]);

//   // Export to PDF
//   const exportToPdf = () => {
//     const doc = new jsPDF();
//     const head = [['Name', 'Mobile', 'Email', 'Package', 'Type', 'Session Length', 'Price', 'Date']];
//     const body = data.map(item => [
//       item.customer?.fullName,
//       item.customer?.mobileNumber,
//       item.customer?.email,
//       item.packageName,
//       item.schedulingType,
//       item.sessionLength,
//       `₹${item.price}`,
//       new Date(item.purchaseDate).toLocaleDateString('en-IN'),
//     ]);
//     autoTable(doc, { head, body });
//     doc.save('purchase-history.pdf');
//   };

//   // CSV headers
//   const csvHeaders = [
//     { label: 'Name', key: 'customer.fullName' },
//     { label: 'Mobile', key: 'customer.mobileNumber' },
//     { label: 'Email', key: 'customer.email' },
//     { label: 'Package', key: 'packageName' },
//     { label: 'Scheduling Type', key: 'schedulingType' },
//     { label: 'Session Length', key: 'sessionLength' },
//     { label: 'Price', key: 'price' },
//     { label: 'Date', key: 'purchaseDate' },
//   ];

//   return (
//     <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
//       {/* Title and Search */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-3xl font-bold text-[#9A3412]">Purchase History</h1>
//         <input
//           type="text"
//           placeholder="Search by name, email, or mobile"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1); // reset to first page on search
//           }}
//           className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FBBF24] w-full md:w-1/3"
//         />
//       </div>

//       {/* Export Buttons */}
//       <div className="flex justify-end mb-6 gap-4">
//         <button
//           onClick={exportToPdf}
//           className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md hover:bg-[#7C2D12] transition-all duration-300"
//         >
//           Export PDF
//         </button>
//         <CSVLink
//           data={data.map(r => ({
//             ...r,
//             'customer.fullName': r.customer?.fullName,
//             'customer.mobileNumber': r.customer?.mobileNumber,
//             'customer.email': r.customer?.email,
//             purchaseDate: new Date(r.purchaseDate).toLocaleDateString('en-IN'),
//           }))}
//           headers={csvHeaders}
//           filename="purchase-history.csv"
//           className="px-6 py-3 bg-[#FBBF24] text-[#7C2D12] rounded-lg shadow-md hover:bg-[#D97706] transition-all duration-300"
//         >
//           Export CSV
//         </CSVLink>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
//         <table className="min-w-full divide-y divide-[#FBBF24]">
//           <thead className="bg-[#9A3412] text-white">
//             <tr>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Mobile</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-left">Package</th>
//               <th className="px-4 py-3 text-left">Type</th>
//               <th className="px-4 py-3 text-left">Session</th>
//               <th className="px-4 py-3 text-left">Price</th>
//               <th className="px-4 py-3 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#FEE2E2]">
//             {data.map(item => (
//               <tr key={item._id} className="hover:bg-[#fde68a33] transition-all">
//                 <td className="px-4 py-2">{item.customer?.fullName}</td>
//                 <td className="px-4 py-2">{item.customer?.mobileNumber}</td>
//                 <td className="px-4 py-2">{item.customer?.email}</td>
//                 <td className="px-4 py-2">{item.packageName}</td>
//                 <td className="px-4 py-2">{item.schedulingType}</td>
//                 <td className="px-4 py-2">{item.sessionLength}</td>
//                 <td className="px-4 py-2">₹{item.price}</td>
//                 <td className="px-4 py-2">{new Date(item.purchaseDate).toLocaleDateString('en-IN')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-8 flex justify-center items-center space-x-6">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage(p => Math.max(1, p - 1))}
//           className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md disabled:opacity-50 transition-all duration-300"
//         >
//           Previous
//         </button>
//         <span className="text-lg text-[#9A3412]">
//           Page <strong>{page}</strong> of <strong>{totalPages}</strong>
//         </span>
//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//           className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md disabled:opacity-50 transition-all duration-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseHistory;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const PurchaseHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchHistory = async () => {
    try {
      const res = await axios.get('https://tathashtuapi.ksdelhi.net/api/admin/get_all_purchase_history', {
        params: { page, limit, search },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setData(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch purchase history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, search]);

  // Export to PDF
  const exportToPdf = () => {
    const doc = new jsPDF();
    const head = [['Purchase For', 'Name', 'Mobile', 'Email', 'Package', 'Type', 'Session Length', 'Price', 'Date']];
    const body = data.map(item => [
      // If purchase is for a family member, show their name in "Purchase For"
      item.purchaseFor?.isFamilyMember ? item.purchaseFor.name : '',
      item.customer?.fullName, // Keep customer name as it is
      item.customer?.mobileNumber,
      item.customer?.email,
      item.packageName,
      item.schedulingType,
      item.sessionLength,
      `₹${item.price}`,
      new Date(item.purchaseDate).toLocaleDateString('en-IN'),
    ]);
    autoTable(doc, { head, body });
    doc.save('purchase-history.pdf');
  };

  // CSV headers
  const csvHeaders = [
    { label: 'Purchase For', key: 'purchaseForName' },
    { label: 'Name', key: 'customer.fullName' },
    { label: 'Mobile', key: 'customer.mobileNumber' },
    { label: 'Email', key: 'customer.email' },
    { label: 'Package', key: 'packageName' },
    { label: 'Scheduling Type', key: 'schedulingType' },
    { label: 'Session Length', key: 'sessionLength' },
    { label: 'Price', key: 'price' },
    { label: 'Date', key: 'purchaseDate' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] min-h-screen">
      {/* Title and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#9A3412]">Purchase History</h1>
        <input
          type="text"
          placeholder="Search by name, email, or mobile"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FBBF24] w-full md:w-1/3"
        />
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end mb-6 gap-4">
        <button
          onClick={exportToPdf}
          className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md hover:bg-[#7C2D12] transition-all duration-300"
        >
          Export PDF
        </button>
        <CSVLink
          data={data.map(r => ({
            purchaseForName: r.purchaseFor?.isFamilyMember ? r.purchaseFor.name : '', // Show family member name if applicable
            'customer.fullName': r.customer?.fullName,
            'customer.mobileNumber': r.customer?.mobileNumber,
            'customer.email': r.customer?.email,
            purchaseDate: new Date(r.purchaseDate).toLocaleDateString('en-IN'),
          }))}
          headers={csvHeaders}
          filename="purchase-history.csv"
          className="px-6 py-3 bg-[#FBBF24] text-[#7C2D12] rounded-lg shadow-md hover:bg-[#D97706] transition-all duration-300"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-[#FBBF24]">
          <thead className="bg-[#9A3412] text-white">
            <tr>
             
              <th className="px-4 py-3 text-left">Name</th>
               <th className="px-4 py-3 text-left">Purchase For</th>
              <th className="px-4 py-3 text-left">Mobile</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Session</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FEE2E2]">
            {data.map(item => (
              <tr key={item._id} className="hover:bg-[#fde68a33] transition-all">
                
                <td className="px-4 py-2">{item.customer?.fullName}</td>
                <td className="px-4 py-2">
                  {/* Show family member name in 'Purchase For' if applicable */}
                  {item.purchaseFor?.isFamilyMember ? item.purchaseFor.name : 'N/A'}
                </td>
                <td className="px-4 py-2">{item.customer?.mobileNumber}</td>
                <td className="px-4 py-2">{item.customer?.email}</td>
                <td className="px-4 py-2">{item.packageName}</td>
                <td className="px-4 py-2">{item.schedulingType}</td>
                <td className="px-4 py-2">{item.sessionLength}</td>
                <td className="px-4 py-2">₹{item.price}</td>
                <td className="px-4 py-2">{new Date(item.purchaseDate).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md disabled:opacity-50 transition-all duration-300"
        >
          Previous
        </button>
        <span className="text-lg text-[#9A3412]">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          className="px-6 py-3 bg-[#9A3412] text-white rounded-lg shadow-md disabled:opacity-50 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PurchaseHistory;

