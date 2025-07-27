const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const {isValidObjectId, Types} = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
  try{
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //Fetch total income & expenses
    const totalIncome = await Income.aggregate([
      {$match: {userId: userObjectId}},
      {$group: {_id: null, total: {$sum: "$amount"}}},
    ]);

    console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

    const totalExpense = await Expense.aggregate([
      {$match: {userId: userObjectId}},
      {$group: {_id: null, total: {$sum: "$amount"}}},
    ])

    //Fetch last 60 days income & expenses
    const last60DaysIncomeTransactions = await Income.find({
      userId ,
      date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
    }).sort({date: -1});

    // Calculate total income for the last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount, 0
    );

    //Get Expenses transaction in the last 30days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
    }).sort({date: -1});

    //Total Expenses for the last 30 days
    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //Fetch last 5 trnasactions (Income + Expense)
    const lastTransactions = [
      ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "Income",
        })
      ),
      ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "Expense",
        })
      ),
    ].sort((a, b) => b.date - a.date); //sort latest first

    //Final Response
    res.status(200).json({
      success: true,
      data: {
        totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpenses: {
          total: expensesLast30Days,
          transactions: last30DaysExpenseTransactions,
        },
        last60DaysIncome: {
          total: incomeLast60Days,
          transactions: last60DaysIncomeTransactions
        },
        recentTransactions: lastTransactions,
      }
    })
  }catch(e){
    console.log(e);
    res.status(500).json({message: "Server Error", error: e.message});
  }
}