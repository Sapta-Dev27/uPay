import express from 'express';
import 'dotenv/config'

const SECRET_KEY = process.env.SECRET_KEY_REFRESH_TOKEN;
const jwt_time = process.env.JWT_TIME_REFRESH_TOKEN;


const refreshToken = async (user) => {
  const payLoad = {
    _id: user._id,
    usernameFromRefreshToken: user.username,
    emailFromRefreshToken: user.email,
    userphoneFromRefreshToken: user.phone
  }
  return jwt.sign(payLoad, SECRET_KEY, {
    expiresIn: jwt_time
  });
}
const refreshToken2 = async (user) => {
  const payLoad = {
    _id: user._id,
    serviceProviderNameFromRefreshToken: user.serviceProviderName,
    serviceProviderEmailFromRefreshToken: user.serviceProviderEmail,
    serviceProviderPhoneFromRefreshToken: user.serviceProviderPhone
  }
  return jwt.sign(payLoad, SECRET_KEY, {
    expiresIn: jwt_time
  });
}

export { refreshToken };