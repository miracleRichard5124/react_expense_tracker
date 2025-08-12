import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: Number(item?.amount),
    }));

    console.log("Incoming Data: ", data);
    console.log("Updated Data: ", chartData);

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Last 60 Days Income</h5>


      </div>
      {chartData.length > 0 ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`$${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          No Income added yet
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
