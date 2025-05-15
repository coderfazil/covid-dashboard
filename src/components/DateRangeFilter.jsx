import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const DateRangeFilter = ({ startDate, endDate, onDateChange }) => {
 

  return (
    <div className="bg-white rounded-md px-4 py-2 shadow-sm flex items-center gap-4 text-sm border border-gray-300">
      <span className="font-medium text-gray-700">Filter by Date:</span>

      <input
        type="date"
        value={startDate}
        onChange={(e) => onDateChange('start', e.target.value)}
        className="bg-transparent outline-none border-none text-gray-800"
      />

      <span className="text-gray-500">-</span>

      <input
        type="date"
        value={endDate}
        onChange={(e) => onDateChange('start', e.target.value)}
        className="bg-transparent outline-none border-none text-gray-800"
      />

      <IoIosArrowDown className="ml-auto text-gray-400" />
    </div>
  );
};

export default DateRangeFilter;