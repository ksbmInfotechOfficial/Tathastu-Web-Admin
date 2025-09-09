// src/components/Table.js
import React from 'react';

// Table Component
const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-2">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-[#101820] text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-2 text-left font-semibold"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-2">
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
