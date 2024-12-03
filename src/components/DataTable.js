import React from "react";

const DataTable = ({ data, onEdit, onDelete }) => {
  // Check if there's any data to display
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-8">
        No data available to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-8 shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        {/* Table Header */}
        <thead className="bg-gray-100 border-b">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="text-left px-4 py-2 text-gray-600 uppercase text-[10px] md:text-sm font-semibold tracking-wider"
              >
                {key}
                {key.toLowerCase().includes("required") && (
                  <span className="text-red-500">*</span>
                )}
              </th>
            ))}
            <th className="text-left px-4 py-2 text-gray-600 uppercase text-[10px] md:text-sm font-semibold tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b hover:bg-gray-50 text-[12px] md:text-sm ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
            >
              {Object.entries(row).map(([key, value], colIndex) => (
                <td
                  key={colIndex}
                  className={`px-2 md:px-4 py-2 text-center text-gray-700 ${key.toLowerCase().includes("required")
                    ? "border-l-4 text-[10px] md:text-sm border-red-500 bg-red-50"
                    : ""
                    }`}
                >
                  {value}
                </td>
              ))}
              <td className="px-4 py-2 text-gray-700 flex space-x-2 justify-center">
                {/* Edit Button */}
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => onEdit(rowIndex)}
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => onDelete(rowIndex)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
