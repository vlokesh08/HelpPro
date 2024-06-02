const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const PersonalInfo = require('../models/personalInfoModel');
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const { username,firstName,lastName, email, password, pic } = req.body;
  
    if (!username || !email || !password || !firstName || !lastName) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
    const personalInfoExists = await PersonalInfo.findOne({
      username,
    });
  
    if (userExists || personalInfoExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      username,
      email,
      fullName: firstName + " " + lastName,
      password,
      pic,

    });

    const personalInfo = await PersonalInfo.create({
      username,
      firstName,
      lastName,
      email,
      user: user._id,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });


  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

module.exports =  { registerUser, authUser };