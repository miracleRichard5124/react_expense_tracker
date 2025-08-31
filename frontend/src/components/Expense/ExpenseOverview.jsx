import React from 'react';
import { useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { useState } from 'react';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onAddExpense}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result)
  }, [transactions]);

  return (
    <div className='card'>
      <div className="flex items-center gap-10 justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="mt-0.5 text-xs text-gray-400">Track your spending trends over time and gain insights into where your money goes...</p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className='text-lg'/>
          Add Expense
        </button>
      </div>

      <div className="mt-10 flex justify-center px-2">
        <div className="w-full max-w-3xl">
          <CustomLineChart data={chartData}/>
        </div>
      </div>
    </div>
  );
}

export default ExpenseOverview;
