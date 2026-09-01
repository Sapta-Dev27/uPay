import express from 'express' ;
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import { accessToken } from '../lib/accessToken.js' ;
import { refreshToken } from '../lib/refershToken.js'

const loginController = async( req , res) => {
  try{
     const { username , password } = req.body;
     if( !username || !password){
      return res.status(400).json({
        success : false, 
        message : 'All fields are required'
      })
     }
     const findUser = await User.findOne({
      userName : username
     })
     if( !findUser){
      return res.status(404).json({
        success : false,
        message : 'User not found'
      })
     }
     const checkPass = await bcrypt.compare(password , findUser.userPassword);
     if(!checkPass){
      return res.status(400).json({
        success : false,
        message : 'Invalid password'
      })
     }
     const accessTokenValue = await accessToken(findUser);
     const refreshTokenValue = await refreshToken(findUser);

     return res.status(200).json({
      success : true,
      message : 'User logged in successfully',
      data : findUser,
      accessToken : accessTokenValue,
      refreshToken : refreshTokenValue
    })
  }
  catch(error){
    console.log('Something went wrong in login controller');
    console.log(error.message);
    return res.status(500).json({
      message : error.message,
      success : false
    })
  }
}

export default loginController;