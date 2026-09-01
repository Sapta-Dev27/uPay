import mongoose from "mongoose";

const mpinScehma = new mongoose.Schema({
  mpin: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })


const mpin = mongoose.model('MPIN', mpinScehma);

export default mpin;