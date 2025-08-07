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
import RecentIncomeWithChart from "./RecentIncomeWithChart";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again! ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  if (loading || !dashboardData) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value={addThousandSeperator(dashboardData.totalExpense)}
          />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate('/expense')}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance}
            totalIncome={dashboardData?.totalIncome}
            totalExpense={dashboardData?.totalExpense}
          /> */}

          {/* <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          /> */}

          <RecentIncomeWithChart
            data={dashboardData?.Last60DaysIncome?.transaction?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
