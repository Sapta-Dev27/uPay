import mongoose from 'mongoose';

const upidSchema = new mongoose.Schema({
  upidId: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 100
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
})
const upi = mongoose.model('upi', upidSchema);
export default upi;