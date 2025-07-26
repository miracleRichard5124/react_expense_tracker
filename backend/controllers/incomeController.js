const xlsx = require("xlsx");
const Income = require('../models/Income');


//Add Income
exports.addIncome = async(req, res) => {
  const userId = req.user.id;

  try{
    const {icon, source, amount, date} = req.body;

    //Validate all fields
    if(!source || !amount || !date){
      return res.status(400).json({message: "All fiedls are required!"});
    }

    const newIncome = new Income({
      userId, 
      icon, 
      amount, 
      source, 
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  }catch(e){
    console.log(e);
    res.status(500).json({message: "Server Error: "});
  }
}

// Get All Income
exports.getAllIncome = async(req, res) => {
  const userId = req.user.id;

  try{
    const incomes = await Income.find({userId}).sort({date: -1});
    res.status(200).json(incomes);
  }catch(e){
    console.log(e);
    res.status(500).json({message: "Server Error!"});
  }
}

//Delete Income
exports.deleteIncome = async(req, res) => {
  const incomeId = req.params.id;

  try{
    await Income.findByIdAndDelete(incomeId);
    res.status(200).json({message: "Income deleted successfully!"});
  }catch(e){
    console.log(e);
    res.status(500).json({message: "Server Error!"});
  }
}

//Download Income Excel
exports.downloadIncomeExcel = async(req, res) => {
  const userId   = req.user.id;

  try{
    const income = await Income.find({userId}).sort({date: -1});

    //Preparing data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    try{
      res.download("income_details.xlsx");
    } catch(e){
      res.json({message: "Error downloading file!"});
    }
  } catch(e){
    console.log(e);
    res.status(500).json({message: "Server Error!"});
  }
}