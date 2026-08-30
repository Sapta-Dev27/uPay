import express from "express";
import Wallet from "../models/wallet.js";
import User from "../models/user.js";

const createWallet = async (req, res) => {
  try {
    const userId = req.userInfo._id;
    const existingWallet = await Wallet.findOne({
      userId: userId
    })

    if (existingWallet) {
      return res.status(400).json({
        success: false,
        message: 'Wallet already exists'
      })
    }

    const newWallet = await Wallet.create({
      userId: userId,
      walletCoins: 0
    })

    return res.status(201).json({
      success: true,
      message: 'Wallet created successfully',
      data: newWallet
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

const transferCoins = async (req, res) => {
  try {
    const userId = req.userInfo._id;

    const findWallet = await Wallet.findOne({
      userId: userId
    })

    if (!findWallet) {
      return res.status(400).json({
        success: false,
        message: 'Wallet not found'
      })
    }

    const coins = findWallet.walletCoins;

    const a = coins / 100;
    const b = a * 10;

    const findUser = await User.findOne({
      _id: userId
    })
    const balance = findUser.userBalance;

    findUser.userBalance += b;
    await findUser.save();

    return res.status(200).json({
      success: true,
      message: 'Coins transferred successfully',
      data: findUser,
      coinsTransferred: coins,
      newBalance: findUser.userBalance
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
  createWallet,
  transferCoins
}