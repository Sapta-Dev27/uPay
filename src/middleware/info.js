import express from 'express';

const infoMiddleware = (req , res , next) => {
  console.log(`REQUEST RECEIVED : ${req.method}`)
  console.log(`REQUEST COMING FROM : ${req.originalUrl}`)
  console.log(`REQUEST TIME : ${new Date().toISOString()}`)
  next();
}

export default infoMiddleware;