// src/pages/Dashboard.js
import React from 'react';
import Table from '../../components/Table/Table';

const User = () => {
  // Columns configuration
  const columns = [
    { Header: 'Order ID', accessor: 'orderId' },
    { Header: 'Customer', accessor: 'customer' },
    { Header: 'Product', accessor: 'product' },
    { Header: 'Amount', accessor: 'amount' },
    { Header: 'Status', accessor: 'status' },
  ];

  // Sample data for the table
  const data = [
    { orderId: '12345', customer: 'John Doe', product: 'Laptop', amount: '$1200', status: 'Shipped' },
    { orderId: '12346', customer: 'Jane Smith', product: 'Phone', amount: '$800', status: 'Pending' },
    { orderId: '12347', customer: 'Bob Johnson', product: 'Headphones', amount: '$200', status: 'Delivered' },
    { orderId: '12348', customer: 'Alice Brown', product: 'Monitor', amount: '$400', status: 'Shipped' },
    { orderId: '12349', customer: 'Charlie Davis', product: 'Keyboard', amount: '$100', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#101820] to-[#FEE715] p-4">
      <h1 className="text-4xl font-semibold text-white">Users</h1>
      <p className="mt-2 text-lg text-gray-300">This is users data</p>

      {/* Table Section */}
      <div>
        <h2 className="text-2xl font-semibold text-[#101820] mb-2">Orders</h2>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default User;
