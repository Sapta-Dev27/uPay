import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  transactionStatus: {
    type: String,
    enum: ['success', 'failed', 'processing', 'refunded'],
    default: 'processing'
  },
  transactionType: {
    type: String,
    enum: ['P2P', 'recharge', 'electricity', 'water', 'gas', 'insurance', 'loan'],
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const transaction = mongoose.model('transaction', transactionSchema);
export default transaction;