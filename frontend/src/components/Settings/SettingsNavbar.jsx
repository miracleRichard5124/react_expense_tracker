import React, {useState} from 'react';

const SettingsNavbar = ({activeBar, setActiveBar}) => {
  return (
    <div className='flex justify-between items-center sticky border-b border-gray-200 top-0 bg-white z-10 gap-3'>
      {['user', 'account'].map((tab) => (
        <button 
          key={tab} 
          className={`px-4 py-2 text-sm font-medium justify-center items-center ${
            activeBar === tab 
            ? 'text-purple-600 border-b-2 border-purple-600' 
            : 'text-gray-500 hover:text-gray-700'}`} 
          onClick={() => setActiveBar(tab)}>
            {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default SettingsNavbar;
