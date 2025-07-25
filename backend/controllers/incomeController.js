const User = require('../models/User');
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
exports.getAllIncome = async(req, res) => {}

//Delete Income
exports.deleteIncome = async(req, res) => {}

//Download Income Excel
exports.downloadIncomeExcel = async(req, res) => {}