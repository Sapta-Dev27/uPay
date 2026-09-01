import express from 'express';
import User from '../models/User.js';
import MPIN from '../models/MPIN.js';
import bcrypt from 'bcrypt';

const displayProfile = async (req, res) => {
  try {
    const useremail = req.userInfo.emailFromAccessToken;

    const findUser = await User.findOne({
      userEmail: useremail
    });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const fetchdata = {
      usernameOnProfile: findUser.userName,
      emailOnProfile: findUser.userEmail,
      phoneOnProfile: findUser.userPhone,
      mpinOnProfile: findUser.userMPIN,
      upidOnProfile: findUser.userUPID,
      balanceOnProfile: findUser.userBalance,
    }

    return res.status(200).json({
      success: true,
      message: 'User profile fetched successfully',
      data: fetchdata
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const changeMPIN = async (req, res) => {
  try {
    const useremail = req.userInfo.emailFromAccessToken;
    const { password, oldMPIN, newMPIN } = req.body;
    if (!password || !oldMPIN || !newMPIN) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    const findUser = await User.findOne({
      userEmail: useremail
    })

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const checkPass = await bcrypt.compare(password, findUser.userPassword);
    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      })
    }
    const checkOldMPIN = await bcrypt.compare(oldMPIN, findUser.userMPIN);
    if (!checkOldMPIN) {
      return res.status(401).json({
        success: false,
        message: 'Invalid old MPIN'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewMPIN = await bcrypt.hash(newMPIN, salt);

    findUser.userMPIN = hashedNewMPIN;
    await findUser.save();

    const newUser = await User.findById(findUser._id);

    return res.status(200).json({
      success: true,
      message: 'MPIN changed successfully',
      data: newUser,
      newMPIN: hashedNewMPIN
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export {
  displayProfile,
  changeMPIN
}