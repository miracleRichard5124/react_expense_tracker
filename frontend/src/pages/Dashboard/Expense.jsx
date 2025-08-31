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
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

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

  const deleteExpense = async(id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense details deleted successfully.");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error deleting Expense details, " 
        + error?.response?.data?.message || error.message
      );
    }
  }

  const handleDownloadExpenseDetails = async() => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, 
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error('Error downloading expense details: ', error);
      toast.error('Failed to download expense details. Please try again later.');
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return <DashboardLayout activeMenu="Expense">
    <div className="mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)}/>
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => {
            setOpenDeleteAlert({show: true, data: id});
          }}
          onDownload={handleDownloadExpenseDetails}
        />
      </div>

      <Modal 
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title='Add Expense'
      >
        <AddExpenseForm onAddExpense={handleAddExpense}/>
      </Modal>

      <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title='Delete Expense'
        >
          <DeleteAlert
            content='Are you sure you want to delete this Expense details?'
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
    </div>
  </DashboardLayout>;
};

export default Expense;
