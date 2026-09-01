import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import upid from '../models/Upid.js';

const createUPID = async (req, res) => {
  try {
    const userphone = req.userInfo.userphoneFromAccessToken;
    const username = req.userInfo.usernameFromAccessToken;

    const generateUPID = username + userphone + "@upay";

    const findUpid = await upid.findOne({
      upid: generateUPID
    });
    if (findUpid) {
      return res.status(400).json({
        success: false,
        message: 'UPID already exists'
      })
    }

    const findUser = await User.findOne({
      userEmail: req.userInfo.emailFromAccessToken
    })

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    findUser.userUPID = generateUPID;
    await findUser.save();

    const createUPID = await upid.create({
      upidId: generateUPID,
      userId: findUser._id
    })

    if (createUPID) {
      return res.status(201).json({
        success: true,
        message: 'UPID created successfully',
        upid: generateUPID
      })
    }
  }
  catch (error) {
    console.log('Something went wrong in createUPID controller');
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const fetchAllUPIDs = async (req, res) => {
  try {
    const fetchAllUPIDs = await upid.find();
    return res.status(200).json({
      success: true,
      message: 'All UPIDs fetched successfully',
      data: fetchAllUPIDs
    })
  }
  catch (error) {
    console.log('Something went wrong in fetchAllUPIDs controller');
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export {
  createUPID,
  fetchAllUPIDs
}