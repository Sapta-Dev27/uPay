import express from 'express' ;
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import user from '../models/user.js';


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
      username : username
     })
     if( !findUser){
      return res.status(404).json({
        success : false,
        message : 'User not found'
      })
     }
     const checkPass = await bcrypt.compare(password , findUser.password);
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
      accessToken : accessTokenValue,
      refreshToken : refreshTokenValue
    })
  }
  catch(error){
    console.log('Something went wrong in login controller');
    return res.status(500).json({
      message : 'Something went wrong in login controller',
      success : false
    })
  }
}

export default loginController;