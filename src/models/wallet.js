import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  walletBalance : {
    type : Number ,
    default : 0
  }
}, {
  timestamps : true
})

const wallet = mongoose.model('wallet' , walletSchema);
export default wallet;