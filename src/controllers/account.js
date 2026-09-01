import express from 'express';
import Account from '../models/AccountUser.js';
import User from '../models/user.js';
import ServiceProvider from '../models/serviceProvider.js';
import AccountService from '../models/AccountService.js';

const createUserAccount = async (req, res) => {
  try {
    const { accNo } = req.body;
    const userId = req.userInfo._id;

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const findAccount = await Account.findOne({
      userId: userId,
    });

    if (findAccount) {
      return res.status(400).json({
        success: false,
        message: "Account already exists for this user"
      })
    }

    const newAccount = await Account.create({
      userId: userId,
      accountNumber: accNo
    });

    if (!newAccount) {
      return res.status(400).json({
        success: false,
        message: "Failed to create account"
      })
    }

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: newAccount
    })

  }
  catch (error) {
    console.log('Error creating user account:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const createServiceProviderAccount = async (req, res) => {
  try {
    const { accNo } = req.body;
    const userId = req.userInfo._id;
    const serviceProviderName = req.userInfo.serviceProviderNameFromAccessToken;

    const findServiceProvider = await ServiceProvider.findOne({
      userId: userId,
      serviceProviderName: serviceProviderName
    });

    if (!findServiceProvider) {
      return res.status(404).json({
        success: false,
        message: "Service provider not found"
      })
    }

    const findAccount = await AccountService.findOne({
      userId: userId,
    });

    if (findAccount) {
      return res.status(400).json({
        success: false,
        message: "Account already exists for this user"
      })
    }

    const newAccount = await AccountService.create({
      userId: userId,
      accountNumber: accNo,
      serviceProviderName: serviceProviderName
    });

    if (!newAccount) {
      return res.status(400).json({
        success: false,
        message: "Failed to create account"
      })
    }

    return res.status(201).json({
      success: true,
      message: "Service provider account created successfully",
      data: newAccount
    })

  }
  catch (error) {
    console.log('Error creating service provider account:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const fetchAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No accounts found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Accounts fetched successfully',
      data: accounts
    })
  }
  catch (error) {
    console.log('Error fetching accounts:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export { createUserAccount, createServiceProviderAccount, fetchAllAccounts };