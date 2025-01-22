import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const databaseConnect = async() => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Successfully connected to MongoDB");
    } catch (e) {
      console.error(e);
    }
}