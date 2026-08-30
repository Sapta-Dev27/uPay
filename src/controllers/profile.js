import express from 'express';
import User from '../models/User.js';
import MPIN from '../models/MPIN.js';
import bcrypt from 'bcrypt';

const displayProfile = async(req , res) => {
  try{
    const useremail = req.userInfo.usernameFromAccessToken;

    const findUser = await User.findOne({
      email : useremail
    });

    if(!findUser){
      return res.status(404).json({
        success : false,
        message : 'User not found'
      })
    }

    const fetchDadata = {
      usernameOnProfile : findeUser.username,
      emailOnProfile : findUser.email,
      phoneOnProfile : findUser.phone,
      mpinOnProfile : findUser.mpin,
      upidOnProfile : findUser.upid,
      balanceOnProfile : findUser.balance
    }

    return res.status(200).json({
      success : true ,
      message : 'User profile fetched successfully',
      data : fetchDadata
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

const changeMPIN =async(req , res) => {
  try{
     const useremail= req.userInfo.usernameFromAccessToken;
     const {password , oldMPIN , newMPIN} = req.body;
     if(!password || !oldMPIN || !newMPIN){
      return res.status(400).json({
        success : false,
        message : 'Please provide all required fields'
      })  
     }

     const findUser = await User.findOne({
      email : useremail
     })

     if(!findUser){
      return res.status(404).json({
        success : false,
        message : 'User not found'
      })
     }

     const checkPass = await bcrypt.compare(password , findUser.password);
     if(!checkPass){
      return res.status(401).json({
        success : false,
        message : 'Invalid password'
      })
     }
     const checkOldMPIN = await bcrypt.compare(oldMPIN , findUser.mpin);
      if(!checkOldMPIN){
        return res.status(401).json({
          success : false,
          message : 'Invalid old MPIN'
        })
      }

      const salt = await bcrypt.genSalt(10);
      const hashedNewMPIN = await bcrypt.hash(newMPIN , salt);

      const updateUser = await User.findByIdAndUpdate(findUser._id , {
        mpin : hashedNewMPIN
      } , {new : true})

      const newUser = await User.findById(findUser._id);

      return res.status(200).json({
        success : true,
        message : 'MPIN changed successfully',
        data : newUser
      })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

export {
  displayProfile,
  changeMPIN
}