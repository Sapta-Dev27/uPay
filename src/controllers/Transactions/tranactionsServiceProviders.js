import express from 'express';
import Account from '../models/Account.js';
import User from '../models/User.js';
import ServiceProvider from '../models/ServiceProvider.js';
import Wallet from '../models/Wallet.js';
import AccountService from '../models/AccountService.js';

const processTransaction = async (req, res) => {
  try {
    const { serviceName, amount } = req.body;
    const userId = req.userInfo._id;

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const findServiceProvider = await ServiceProvider.findOne({ serviceName: serviceName });
    if (!findServiceProvider) {
      return res.status(404).json({
        success: false,
        message: "Service Provider not found"
      })
    }

    const userAccount = await Account.findOne({ userId: userId });
    if (!userAccount) {
      return res.status(404).json({
        success: false,
        message: "User account not found"
      })
    }

    const currBalance = findUser.accountBalance;
    if (currBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance"
      })
    }

    findUser.accountBalance -= amount;
    await findUser.save();

    const generate = Math.random();
    if (generate < 0.35 && generate > 0.25) {
      findUser.accountBalance += amount;
      await findUser.save();
      return res.status(500).json({
        success: false,
        message: "Transaction failed due to network error. Amount refunded to your account"
      })
    }

    findServiceProvider.providerBalance += amount;
    await findServiceProvider.save();

    const findWallet = await Wallet.findOne({ userId: userId });
    if (!findWallet) {
      return res.status(404).json({
        success: false,
        message: "User wallet not found"
      })
    }

    findWallet.walletCoins += 100;
    await findWallet.save();

    userAccount.accountBalance -= amount;
    await userAccount.save();



    const findServiceProviderAccount = await AccountService.findOne({ userId: findServiceProvider._id });
    if (!findServiceProviderAccount) {
      return res.status(404).json({
        success: false,
        message: "Service Provider account not found"
      })
    }

    findServiceProviderAccount.accountBalance += amount;
    await findServiceProviderAccount.save();

    const createTransaction = await Transaction.create({
      userId: userId,
      serviceProviderId: findServiceProvider._id,
      amount: amount,
      status: "Success"
    })

    return res.status(200).json({
      success: true,
      message: "Transaction successful",
      data: createTransaction
    })


  }
  catch (error) {
    console.log('Error processing transaction:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export { processTransaction };