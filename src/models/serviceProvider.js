import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  providerName : {
    type : String ,
    required : true
  },
  providerType : {
    type : String ,
    enum : ['recharge' , 'electricity' , 'water' , 'gas' , 'insurance' , 'loan'] ,
    required : true
  },
  providerEmail : {
    type : String ,
    required : true ,
    unique : true
  },
  providerPhone : {
    type : String ,
    required : true ,
    unique : true ,
    minLength : 10 ,
    maxLength : 10
  },
  providerUpiID : {
    type : String ,
  },
  providerBalance : {
    type : Number ,
    default : 0
  }
} , {
  timestamps : true 
})

const serviceProvider = mongoose.model('ServiceProvider' , serviceProviderSchema);
export default serviceProvider;