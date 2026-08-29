import mongoose  from "mongoose";
import 'dotenv/config'

const URI = process.env.MONGODB_URL;

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(URI);
    if(connect){
      console.log('DB CONNECTION IS SUCCESSFULL');
    }
    else{
      console.log('DATABASE CONNECTION FAILED')
    }
  }
  catch(error){
    console.log(error);
  }
}

export default connectToDb;