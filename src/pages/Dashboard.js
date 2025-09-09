// import React from 'react';
// import { Line, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Dashboard = () => {
//   // Sample chart data for Line Chart (e.g. Meetings scheduled over months)
//   const chartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Meetings Scheduled',
//         data: [15, 22, 28, 35, 40, 50],
//         borderColor: '#3A86FF',
//         backgroundColor: '#3A86FF',
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top', labels: { color: '#101820', font: { size: 14 } } },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { color: '#4A5568', font: { size: 13 } },
//         grid: { color: '#E2E8F0' },
//       },
//       x: {
//         ticks: { color: '#4A5568', font: { size: 13 } },
//         grid: { color: '#EDF2F7' },
//       },
//     },
//   };

//   // Sample Pie chart for Meeting Statuses
//   const pieData = {
//     labels: ['Confirmed', 'Pending', 'Cancelled'],
//     datasets: [
//       {
//         data: [40, 20, 5],
//         backgroundColor: ['#3A86FF', '#FFBE0B', '#FF595E'],
//         hoverOffset: 6,
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top', labels: { color: '#101820', font: { size: 14 } } },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.label}: ${ctx.raw}`,
//         },
//       },
//     },
//   };

//   // Updated metrics for Users & Meetings
//   const dashboardMetrics = [
//     {
//       title: 'Total Users',
//       count: 3500,
//       icon: '🧑‍💻',
//       bgColor: 'bg-gradient-to-r from-[#3A86FF] to-[#5AB9FF]',
//       subtitle: 'Registered users',
//     },
//     {
//       title: 'Meetings Scheduled',
//       count: 650,
//       icon: '📅',
//       bgColor: 'bg-gradient-to-r from-[#FFBE0B] to-[#FFD967]',
//       subtitle: 'This month',
//     },
//     {
//       title: 'Meetings Completed',
//       count: 600,
//       icon: '✅',
//       bgColor: 'bg-gradient-to-r from-[#6FCF97] to-[#34D399]',
//       subtitle: 'Successfully done',
//     },
//   ];

//   // Sample upcoming meetings data
//   const upcomingMeetings = [
//     {
//       id: 1,
//       userName: 'Alice Johnson',
//       date: '2025-05-25',
//       time: '10:00 AM',
//       status: 'Confirmed',
//     },
//     {
//       id: 2,
//       userName: 'Bob Smith',
//       date: '2025-05-27',
//       time: '02:00 PM',
//       status: 'Pending',
//     },
//     {
//       id: 3,
//       userName: 'Clara Lee',
//       date: '2025-05-28',
//       time: '11:30 AM',
//       status: 'Confirmed',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#F7FBFF] to-[#E9F7FF] p-6 sm:p-10 overflow-auto">
//       <h1 className="text-4xl font-bold text-[#101820]">Dashboard</h1>
//       <p className="mt-3 text-lg text-gray-600 max-w-xl">Welcome to the Admin Panel. Manage users and meetings efficiently.</p>

//       {/* Metrics */}
//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {dashboardMetrics.map(({ title, count, icon, bgColor, subtitle }, idx) => (
//           <div
//             key={idx}
//             className={`${bgColor} rounded-xl p-6 shadow-lg flex flex-col justify-between cursor-default transform transition duration-300 hover:scale-105`}
//           >
//             <div className="flex items-center justify-between">
//               <span className="text-4xl select-none">{icon}</span>
//               <h3 className="text-xl font-semibold text-white">{title}</h3>
//             </div>
//             <p className="text-sm text-white opacity-75 select-none">{subtitle}</p>
//             <h4 className="text-3xl font-bold text-white mt-2 select-none">{count.toLocaleString()}</h4>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-10">
//         <div className="bg-white p-8 rounded-xl shadow-xl min-h-[350px] transition-transform hover:scale-105">
//           <h2 className="text-2xl font-semibold text-[#101820] mb-6">Meetings Scheduled Over Time</h2>
//           <Line data={chartData} options={chartOptions} />
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-xl min-h-[350px] transition-transform hover:scale-105">
//           <h2 className="text-2xl font-semibold text-[#101820] mb-6">Meeting Status Distribution</h2>
//           <Pie data={pieData} options={pieOptions} />
//         </div>
//       </div>

//       {/* Upcoming Meetings Table */}
//       <div className="mt-14 bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-semibold text-[#101820] mb-6">Upcoming Meetings</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left text-gray-700">
//             <thead className="bg-[#3A86FF] text-white">
//               <tr>
//                 <th className="py-3 px-6 rounded-tl-lg">User Name</th>
//                 <th className="py-3 px-6">Date</th>
//                 <th className="py-3 px-6">Time</th>
//                 <th className="py-3 px-6 rounded-tr-lg">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {upcomingMeetings.map(({ id, userName, date, time, status }) => (
//                 <tr
//                   key={id}
//                   className="border-b border-gray-200 hover:bg-gray-50 cursor-default transition"
//                 >
//                   <td className="py-4 px-6 font-medium">{userName}</td>
//                   <td className="py-4 px-6">{date}</td>
//                   <td className="py-4 px-6">{time}</td>
//                   <td className={`py-4 px-6 font-semibold ${
//                     status === 'Confirmed'
//                       ? 'text-green-600'
//                       : status === 'Pending'
//                       ? 'text-yellow-600'
//                       : 'text-red-600'
//                   }`}>
//                     {status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import React from 'react';
// import { Line, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Dashboard = () => {
//   // Chart data for Line Chart
//   const chartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Revenue',
//         data: [3000, 4000, 5000, 6000, 7000, 8000],
//         borderColor: '#9A3412', // Main color
//         backgroundColor: '#9A3412',
//         fill: false,
//         tension: 0.4,
//         pointBackgroundColor: '#D97706', // Accent color
//         pointHoverRadius: 7,
//         borderWidth: 3,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: { color: '#1F2937', font: { weight: '600' } },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `$${context.raw}`;
//           },
//         },
//         backgroundColor: '#9A3412',
//         titleColor: '#FBBF24',
//         bodyColor: '#FEE2E2',
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: '#7C2D12', font: { weight: '600' } },
//         grid: { color: '#FEE2E2' },
//       },
//       y: {
//         ticks: { color: '#7C2D12', font: { weight: '600' } },
//         grid: { color: '#FEE2E2' },
//       },
//     },
//   };

//   // Pie Chart data
//   const pieData = {
//     labels: ['Sales', 'Returns', 'Pending Orders'],
//     datasets: [
//       {
//         data: [3000, 1000, 500],
//         backgroundColor: ['#9A3412', '#D97706', '#FBBF24'],
//         hoverOffset: 6,
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: { color: '#1F2937', font: { weight: '600' } },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `${context.label}: $${context.raw}`;
//           },
//         },
//         backgroundColor: '#9A3412',
//         titleColor: '#FBBF24',
//         bodyColor: '#FEE2E2',
//       },
//     },
//   };

//   // Metrics for users & meetings with updated colors & icons
//   const dashboardMetrics = [
//     {
//       title: 'Total Users',
//       count: 3500,
//       icon: '🧑‍💻',
//       bgColor: 'bg-gradient-to-r from-[#9A3412] to-[#D97706]', // deep red to amber
//       subtitle: 'Registered users',
//     },
//     {
//       title: 'Meetings Scheduled',
//       count: 650,
//       icon: '📅',
//       bgColor: 'bg-gradient-to-r from-[#D97706] to-[#FBBF24]', // amber to yellow
//       subtitle: 'This month',
//     },
//     {
//       title: 'Meetings Completed',
//       count: 600,
//       icon: '✅',
//       bgColor: 'bg-gradient-to-r from-[#7C2D12] to-[#9A3412]', // darker red shades
//       subtitle: 'Successfully done',
//     },
//   ];


//     const upcomingMeetings = [
//     {
//       id: 1,
//       userName: 'Alice Johnson',
//       date: '2025-05-25',
//       time: '10:00 AM',
//       status: 'Confirmed',
//     },
//     {
//       id: 2,
//       userName: 'Bob Smith',
//       date: '2025-05-27',
//       time: '02:00 PM',
//       status: 'Pending',
//     },
//     {
//       id: 3,
//       userName: 'Clara Lee',
//       date: '2025-05-28',
//       time: '11:30 AM',
//       status: 'Confirmed',
//     },
//   ];
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#FEE2E2] to-[#F3F4F6] p-6 overflow-auto">
//       <h1 className="text-4xl font-semibold text-[#7C2D12]">Dashboard</h1>
//       <p className="mt-4 text-lg text-[#7C2D12]">Welcome to the Admin Panel!</p>

//       {/* Metrics Section */}
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {dashboardMetrics.map((metric, index) => (
//           <div
//             key={index}
//             className={`${metric.bgColor} shadow-lg rounded-lg p-5 h-36 transform transition duration-300 ease-in-out hover:scale-105 flex flex-col justify-between`}
//           >
//             <div className="flex items-center justify-between">
//               <span className="text-4xl">{metric.icon}</span>
//               <h3 className="text-xl font-semibold text-white">{metric.title}</h3>
//             </div>
//             <p className="text-sm text-white">{metric.subtitle}</p>
//             <h4 className="mt-1 text-3xl font-bold text-white">
//               {metric.count.toLocaleString()}
//             </h4>
//           </div>
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
//         {/* Line Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-xl transition transform duration-500 ease-in-out hover:scale-105">
//           <h2 className="text-2xl font-semibold text-[#7C2D12] mb-6">Revenue Over Time</h2>
//           <Line data={chartData} options={chartOptions} />
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-xl transition transform duration-500 ease-in-out hover:scale-105">
//           <h2 className="text-2xl font-semibold text-[#7C2D12] mb-6">Sales Distribution</h2>
//           <Pie data={pieData} options={pieOptions} />
//         </div>
//       </div>


//        <div className="mt-14 bg-white rounded-xl shadow-lg p-6">
//   <h2 className="text-2xl font-semibold text-[#7C2D12] mb-6">Upcoming Meetings</h2>
//   <div className="overflow-x-auto">
//     <table className="min-w-full text-left text-[#7C2D12]  rounded-lg">
//       <thead className="bg-gradient-to-r from-[#9A3412] to-[#D97706] text-white">
//         <tr>
//           <th className="py-3 px-6 rounded-tl-lg ">User Name</th>
//           <th className="py-3 px-6  ">Date</th>
//           <th className="py-3 px-6 ">Time</th>
//           <th className="py-3 px-6 rounded-tr-lg">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {upcomingMeetings.map(({ id, userName, date, time, status }) => (
//           <tr
//             key={id}
//             className="border-b border-[#D97706] hover:bg-[#FEE2E2] transition cursor-default"
//           >
//             <td className="py-4 px-6 font-medium">{userName}</td>
//             <td className="py-4 px-6">{date}</td>
//             <td className="py-4 px-6">{time}</td>
//             <td
//               className={`py-4 px-6 font-semibold ${
//                 status === 'Confirmed'
//                   ? 'text-green-700'
//                   : status === 'Pending'
//                   ? 'text-yellow-600'
//                   : 'text-red-600'
//               }`}
//             >
//               {status}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`https://tathashtuapi.ksdelhi.net/api/admin/getAdminDashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading stats...</p>;
  if (!stats) return <p className="p-6 text-center text-red-600">Failed to load dashboard</p>;

  const {
    totalCustomers,
    totalPurchaseAmount,
    totalBookings,
    totalCompletedBookings,
    totalScheduledBookings,
    todayBookingsCount,
    todayRegisteredCustomersCount,
  } = stats;

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 10000, 18000, 16000, 20000], // Replace with dynamic if needed
        borderColor: '#9A3412',
        backgroundColor: '#9A3412',
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#D97706',
        pointHoverRadius: 7,
        borderWidth: 3,
      },
    ],
  };

  const pieData = {
    labels: ['Completed', 'Scheduled', "Today's"],
    datasets: [
      {
        data: [
          totalCompletedBookings || 0,
          totalScheduledBookings || 0,
          todayBookingsCount || 0,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#F472B6'],
        hoverOffset: 6,
      },
    ],
  };

  const dashboardMetrics = [
    {
      title: 'Total Customers',
      count: totalCustomers,
      icon: '🧑‍💻',
      bgColor: 'bg-gradient-to-r from-[#9A3412] to-[#D97706]',
      subtitle: 'Registered total',
      onClick: () => navigate('/customers'), // Add navigation here
    },
    {
      title: 'Total Revenue',
      count: totalPurchaseAmount,
      icon: '💰',
      bgColor: 'bg-gradient-to-r from-[#D97706] to-[#FBBF24]',
      subtitle: 'Lifetime sales',
    },
    {
      title: 'Total Bookings',
      count: totalBookings,
      icon: '📅',
      bgColor: 'bg-gradient-to-r from-[#7C2D12] to-[#9A3412]',
      subtitle: 'All time',
      onClick: () => navigate('/booking'), 
    },
    {
      title: 'Completed Bookings',
      count: totalCompletedBookings,
      icon: '✅',
      bgColor: 'bg-gradient-to-r from-[#10B981] to-[#059669]',
      subtitle: 'Finished',
    },
    {
      title: "Today's Bookings",
      count: todayBookingsCount,
      icon: '📌',
      bgColor: 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]',
      subtitle: "Today's count",
    },
    {
      title: "Today's Signups",
      count: todayRegisteredCustomersCount,
      icon: '🆕',
      bgColor: 'bg-gradient-to-r from-[#F472B6] to-[#EC4899]',
      subtitle: 'New today',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FEE2E2] to-[#F3F4F6] p-6">
      <h1 className="text-4xl font-semibold text-[#7C2D12]">Dashboard</h1>

      {/* Metrics Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardMetrics.map((m, i) => (
          <div
            key={i}
            className={`${m.bgColor} rounded-lg p-5 h-36 shadow-lg flex flex-col justify-between transform transition hover:scale-105`}
            onClick={m.onClick} // Add onClick event
          >
            <div className="flex justify-between items-center">
              <span className="text-4xl">{m.icon}</span>
              <h3 className="text-xl font-semibold text-white">{m.title}</h3>
            </div>
            <p className="text-sm text-white">{m.subtitle}</p>
            <h4 className="mt-1 text-3xl font-bold text-white">{m.count?.toLocaleString()}</h4>
          </div>
        ))}
      </div>

      {/* Charts and Upcoming Meetings sections can be uncommented similarly */}
    </div>
  );
};

export default Dashboard;
