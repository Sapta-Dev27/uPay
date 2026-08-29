import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from jsonwebtoken;
import User from '../models/user.js';
import accessToken from '../lib/accessToken.js';
import refreshToken from '../lib/refershToken.js';

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }
    const findUser = await User.findOne({
      $or: [
        { username: username },
        { email: email },
        { phone: phone }
      ]
    })
    if (findUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword
    })

    const refreshTokenValue = await refreshToken(newUser);
    const accessTokenValue = await accessToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
      accessToken: accessTokenValue,
      refreshToken: refreshTokenValue
    })

  }
  catch (error) {
    console.log('Something went wrong in register controller');
    return res.status(500).json({
      message: 'Something went wrong in register controller',
      success: false
    })
  }
}

export default register;