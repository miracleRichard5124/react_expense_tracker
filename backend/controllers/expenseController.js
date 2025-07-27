const Expense = require("../models/Expense.js");
const xlsx = require("xlsx");

//Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //Validate All Fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  
  try{
    const expense = await Expense.find({userId}).sort({date: -1});
    res.status(200).json(expense);
  }catch(e){
    res.status(500).json({message: "Server Error!"});
  }
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try{
    await Expense.findByIdAndDelete(expenseId);
    res.status(200).json({message: "expense deleted successfully!"});
  }catch(e){
    console.log(e);
    res.status(500).json({message: "Server Error!"});
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try{
    const expense = await Expense.find({userId}).sort({date: -1});
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    try{
      res.download("expense_details.xlsx");
    }catch(e){
      res.json({message: "Error downloading expense excel file!"});
    }
  }catch(e){
    res.status(500).json({message: "Server Error!"});
  }
};
