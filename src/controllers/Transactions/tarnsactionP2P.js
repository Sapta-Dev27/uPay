import express from 'express';
import User from '../../models/User.js';
import Transaction from '../../models/Transactions.js';
import Wallet from '../../models/Wallet.js';
import ServiceProvider from '../../models/ServiceProvider.js';
import UPID from '../../models/Upid.js';
import Account from '../../models/AccountUser.js';

const makeP2PTransactionByUPID = async (req, res) => {
  try {
    const { senderUPID, reqUPID, amount } = req.body;

    if (!senderUPID || !reqUPID || !amount) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const findSenderUPID = await UPID.findOne({
      upidId: senderUPID
    })

    if (!findSenderUPID) {
      return res.status(404).json({
        success: false,
        message: 'Sender UPID not found'
      })
    }

    const findReceiverUPID = await UPID.findOne({
      upidId: reqUPID
    })

    if (!findReceiverUPID) {
      return res.status(404).json({
        success: false,
        message: 'Receiver UPID not found'
      })
    }

    const senderId = findSenderUPID.userId;
    const receiverId = findReceiverUPID.userId;

    const findSenderWallet = await Wallet.findOne({
      userId: senderId
    });

    if (!findSenderWallet) {
      return res.status(404).json({
        success: false,
        message: 'Sender wallet not found'
      })
    }

    const findSender = await User.findById(senderId);
    const findReceiver = await User.findById(receiverId);

    const senderBalance = findSender.userBalance;
    if (senderBalance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      })
    }

    findSender.userBalance -= amount;
    await findSender.save();

    const generateStatus = Math.random();
    if (generateStatus >= 0.2 && generateStatus <= 0.35) {
      findSender.userBalance += amount;
      await findSender.save();
      return res.status(400).json({
        success: false,
        message: 'Transaction failed due to network error. Please try again later. Money has been refunded to your account.'
      })
    }

    findReceiver.userBalance += amount;
    await findReceiver.save();

    findSenderWallet.walletCoins += 100;
    await findSenderWallet.save();

    const findSenderAccount = await Account.findOne({ userId: senderId });
    if (!findSenderAccount) {
      return res.status(404).json({
        success: false,
        message: 'Sender account not found'
      })
    }

    findSenderAccount.accountBalance -= amount;
    await findSenderAccount.save();

    const findReceiverAccount = await Account.findOne({ userId: receiverId });
    if (!findReceiverAccount) {
      return res.status(404).json({
        success: false,
        message: 'Receiver account not found'
      })
    }

    findReceiverAccount.accountBalance += amount;
    await findReceiverAccount.save();

    const createTransaction = await Transaction.create({
      senderId: senderId,
      receiverId: receiverId,
      transactionAmount: amount,
      transactionStatus: 'success',
      transactionType: 'P2P',
      description: `Transaction from ${findSender.name} to ${findReceiver.name}`
    })

    return res.status(200).json({
      success: true,
      message: 'Transaction successful',
      data: {
        sender: {
          userId: findSender._id,
          name: findSender.name,
        },
        receiver: {
          userId: findReceiver._id,
          name: findReceiver.name,
        },
        TransactionDetails: {
          amount: amount,
          senderUPID: senderUPID,
          receiverUPID: reqUPID,
          status: 'Success',
          transactionDate: new Date(),
        }
      }
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


const makeP2PTransactionByPhoneNumber = async (req, res) => {
  try {
    const { senderPhoneNumber, receiverPhoneNumber, amount } = req.body;
    if (!senderPhoneNumber || !receiverPhoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const findSender = await User.findOne({
      userPhone: senderPhoneNumber
    })

    if (!findSender) {
      return res.status(404).json({
        success: false,
        message: 'Sender not found'
      })
    }

    const findReceiver = await User.findOne({
      userPhone: receiverPhoneNumber
    })

    if (!findReceiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found'
      })
    }

    const senderId = findSender._id;
    const receiverId = findReceiver._id;

    const findSenderWallet = await Wallet.findOne({
      userId: senderId
    })

    if (!findSenderWallet) {
      return res.status(404).json({
        success: false,
        message: 'Sender wallet not found'
      })
    }

    const senderBalance = findSender.userBalance;
    if (senderBalance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      })
    }

    findSender.userBalance -= amount;
    await findSender.save();

    const generateStatus = Math.random();
    if (generateStatus >= 0.2 && generateStatus <= 0.35) {
      findSender.userBalance += amount;
      await findSender.save();
      return res.status(400).json({
        success: false,
        message: 'Transaction failed due to network error. Please try again later.'
      })
    }

    findReceiver.userBalance += amount;
    await findReceiver.save();

    findSenderWallet.walletCoins += 100;
    await findSenderWallet.save();

    const findSenderAccount = await Account.findOne({ userId: senderId });
    if (!findSenderAccount) {
      return res.status(404).json({
        success: false,
        message: 'Sender account not found'
      })
    }

    const findReceiverAccount = await Account.findOne({ userId: receiverId });
    if (!findReceiverAccount) {
      return res.status(404).json({
        success: false,
        message: 'Receiver account not found'
      })
    }

    const createTransaction = await Transaction.create({
      senderId: senderId,
      receiverId: receiverId,
      transactionAmount: amount,
      transactionStatus: 'success',
      transactionType: 'P2P',
      description: `Transaction from ${findSender.name} to ${findReceiver.name}`
    })

    return res.status(200).json({
      success: true,
      message: 'Transaction successful',
      data: {
        sender: {
          userId: findSender._id,
          name: findSender.name,
        },
        receiver: {
          userId: findReceiver._id,
          name: findReceiver.name,
        },
        TransactionDetails: {
          userId: findSender._id,
          amount: amount,
          senderPhoneNumber: senderPhoneNumber,
          receiverPhoneNumber: receiverPhoneNumber,
          transactionStatus: 'Success',
          transactionDate: new Date(),
        }
      }
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

const fetchAllTransactions = async (req, res) => {
  try {
    const findAllTransactions = await Transaction.find();
    if (!findAllTransactions) {
      return res.status(404).json({
        success: false,
        message: 'No transactions found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Transactions found',
      data: findAllTransactions
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


export { makeP2PTransactionByUPID, makeP2PTransactionByPhoneNumber, fetchAllTransactions }