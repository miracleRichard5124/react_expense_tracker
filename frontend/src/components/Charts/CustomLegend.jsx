import React from 'react';

const CustomLegend = ({payload}) => {
  return (
    <div className='margin-0 flex flex-wrap items-center justify-center gap-2 mt-4 space-x-6'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
          <span className="font-medium text-xs text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomLegend;
