import express from 'express';
import 'dotenv/config'

const SECRET_KEY = process.env.SECRET_KEY_ACCESS_TOKEN;
const jwt_time = process.env.JWT_TIME_ACCESS_TOKEN;



const accessToken = async(user) => {
  const payLoad = {
    _id : user._id,
    usernameFromAccessToken : user.username,
    emailFromAccessToken  : user.email,
    userphoneFromAccessToken : user.phone
  }
  return jwt.sign(payLoad, SECRET_KEY , {
    expiresIn : jwt_time
  });
}

export default accessToken;