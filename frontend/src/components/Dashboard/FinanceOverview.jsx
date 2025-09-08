import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandSeperator } from '../../utils/helper';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const COLORS = ['#FF6900', '#875CF5', '#FA2C37'];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

  const {user} = useContext(UserContext);

  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Income", amount: totalIncome},
    {name: "Total Expenses", amount: totalExpense},
  ];

  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`${user?.preferences?.currencySymbol || ''}${addThousandSeperator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
}

export default FinanceOverview;
