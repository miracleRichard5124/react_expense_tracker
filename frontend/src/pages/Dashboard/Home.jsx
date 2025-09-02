import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import Loading from "./Loading"; // import loader

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); // start loading as true

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) setDashboardData(response.data.data);
    } catch (error) {
      console.log("Something went wrong. Please try again! ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  // Helper function for no records card
  const renderNoRecordsCard = (message) => (
    <div className="card p-6 mt-4 border rounded-lg shadow-sm text-center text-gray-500">
      {message}
    </div>
  );

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            icon={<IoMdCard />}
            color="bg-primary"
            label="Total Balance"
            value={addThousandSeperator(dashboardData?.totalBalance)}
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            color="bg-green-500"
            label="Total Income"
            value={addThousandSeperator(dashboardData?.totalIncome)}
          />
          <InfoCard
            icon={<LuHandCoins />}
            color="bg-red-500"
            label="Total Expense"
            value={addThousandSeperator(dashboardData?.totalExpense)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {dashboardData?.recentTransactions?.length > 0 ? (
            <RecentTransactions
              transactions={dashboardData.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
          ) : (
            renderNoRecordsCard("No transactions made yet")
          )}

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance}
            totalIncome={dashboardData?.totalIncome}
            totalExpense={dashboardData?.totalExpense}
          />

          {dashboardData?.last30DaysExpenses?.transactions?.length > 0 ? (
            <ExpenseTransactions
              transactions={dashboardData.last30DaysExpenses.transactions}
              onSeeMore={() => navigate("/expense")}
            />
          ) : (
            renderNoRecordsCard("No Expense records yet")
          )}

          {dashboardData?.last30DaysExpenses?.transactions?.length > 0 ? (
            <Last30DaysExpenses
              data={dashboardData.last30DaysExpenses.transactions}
            />
          ) : null}

          {dashboardData?.last60DaysIncome?.transactions?.length > 0 ? (
            <RecentIncomeWithChart
              data={dashboardData.last60DaysIncome.transactions.slice(0, 4)}
              totalIncome={dashboardData.totalIncome || 0}
            />
          ) : null}

          {dashboardData?.last60DaysIncome?.transactions?.length > 0 ? (
            <RecentIncome
              transactions={dashboardData.last60DaysIncome.transactions}
              onSeeMore={() => navigate("/income")}
            />
          ) : renderNoRecordsCard("No Income records yet")}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
