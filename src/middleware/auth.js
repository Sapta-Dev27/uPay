import express from 'express';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.SECRET_KEY_ACCESS_TOKEN;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is missing'
      })
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Token is missing');
      return res.status(401).json({
        success: false,
        message: 'Token is missing'
      })
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded) {
      console.log('Token is invalid');
      return res.status(401).json({
        success: false,
        message: 'Token is invalid. Authentication failed'
      })
    }
    console.log('Token is valid. Authentication successful');
    console.log('Decoded token:', decoded);
    req.userInfo = decoded;
    next();
  }
  catch (error) {
    console.log('Something went wrong in auth middleware');
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export default authMiddleware;