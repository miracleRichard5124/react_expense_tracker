import React from 'react';

const Loading = () => {
  return (
    <div className='flex inset-0 justify-center items-center fixed bg-black/20 bg-opacity-50 z-50'>
      <div className="flex space-x-4">
        <span className="h-8 w-8 rounded-full bg-white"></span>
        <span className="h-8 w-8 rounded-full bg-white"></span>
        <span className="h-8 w-8 rounded-full bg-white"></span>
      </div>
      
    </div>
  );
}

export default Loading;
