import dotenv from "dotenv";
import { mongoose } from "mongoose";
dotenv.config();

export const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Successfully connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
};
