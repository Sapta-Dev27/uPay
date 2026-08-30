import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import MPIN from '../models/MPIN.js';

const createMPIN = async (req, res) => {
  try {
    const { mpin } = req.body;
    const useremail = req.userInfo.emailFromAccessToken;

    if (!mpin) {
      return res.status(400).json({
        success: false,
        message: 'MPIN is required. It is missing in the request body'
      })
    }

    if (!mpin.length === 4) {
      return res.status(400).json({
        success: false,
        message: 'MPIN must be 4 digits long'
      })
    }

    const findUser = await User.findOne({
      email: useremail
    })

    if (!findUser) {
      console.log('User not found in createMPIN controller');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const weakMPINs = ['0000', '1234', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '4321'];

    if (weakMPINs.includes(mpin)) {
      console.log('Weak MPIN provided');
      return res.status(400).json({
        success: false,
        message: 'Weak MPIN provided. Please choose a stronger MPIN'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedMPIN = await bcrypt.hash(mpin, salt);

    const updateUser = await User.findOneAndUpdate({
      email: useremail
    }, {
      mpin: hashedMPIN
    }, {
      new: true
    })

    const createMPIN = await MPIN.create({
      mpin: hashedMPIN,
      userId: findUser._id
    })
  }
  catch (error) {
    console.log('Something went wrong in createMPIN controller');
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const fetchAllMPINs = async (req, res) => {
  try {
    const fecthAll = await MPIN.find({});
    return res.status(200).json({
      success: true,
      message: 'All MPINs fetched successfully',
      data: fecthAll
    })
  }
  catch (error) {
    console.log('Something went wrong in fetchAllMPINs controller');
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export {
  createMPIN,
  fetchAllMPINs
}