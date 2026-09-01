import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  userPhone: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 10
  },
  userPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  userUPID: {
    type: String,
  },
  userMPIN: {
    type: String,
  },
  userAge: {
    type: Number,
    min: 10
  },
  userWalletID :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'wallet'
  },
  userBalance : {
    type : Number ,
    default : 0
  }
}, {
  timestamps: true
})

const User = mongoose.model('user', userSchema);
export default User;