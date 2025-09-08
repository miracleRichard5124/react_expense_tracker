import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const InfoCard = ({label, value, color, icon}) => {

  const {user} = useContext(UserContext);

  return (
    <div className='flex bg-white rounded-2xl gap-6 p-6 shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className={`${color} w-14 h-14 rounded-full flex justify-center items-center text-white text-[26px] drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mb-1">{label}</h2>
        <span className="text-[22px]">{user?.preferences?.currencySymbol}{value}</span>  
      </div>
    </div>
  );
}

export default InfoCard;
