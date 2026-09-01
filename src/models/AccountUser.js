import express from "express";
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId :{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  accountNumber :{
    type: String,
    required: true,
    unique: true
  },
  accountBalance :{
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Account = mongoose.model("Account", accountSchema);
export default Account;