import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";

const Expense = () => {
  const [expenseData, setExpenseeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseeData(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error feching user Expenses, " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async(expense) => {
    const {category, amount, date, icon} = expense;

    if(!category.trim()){
      toast.error("Category is required!");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if(!date){
      toast.error('Date is required!');
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount, 
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error adding Expense, "
        + error.response?.data?.message || error.message
      );
    };
  }

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return <DashboardLayout activeMenu="Expense">
    <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)}/>
        </div>
      </div>

      <Modal 
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title='Add Expense'
      >
        <AddExpenseForm onAddExpense={handleAddExpense}/>
      </Modal>
    </div>
  </DashboardLayout>;
};

export default Expense;
