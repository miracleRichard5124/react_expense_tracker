const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  if(!req.body){
    return res.status(400).json({message: "Request body is missing!"})
  }

  const { fullName, email, password, profileImageUrl } = req.body;

  //Checks for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    //Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in Use." });
    }

    //Create the New User
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: "All fields are rquired!"});
  }

  try{
    const user = await User.findOne({email});
    if(!user || !(await user.comparePassword(password))){
      return res.status(400).json({message: "Invalid credentials!"});
    }

    res.status(200).json(
      {
        id: user._id,
        user,
        token: generateToken(user._id)
      }
    )
  } catch(err){
    res.status(500).json(
      {
        message: "Error logging into this account.", error: err.message
      }
    )
  }
};

exports.getUserInfo = async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
      return res.status(400).json({message: "User not found!"});
    }

    res.status(200).json(user);
  }catch(error){

  }
};
