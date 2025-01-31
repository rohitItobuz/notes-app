import mongoose from "mongoose";
import user from "../src/models/userSchema.js";
import { databaseConnect } from "../src/config/dbConnection.js";

databaseConnect();

const generateUsers = (num) => {
  const newUsers = [];
  for (let i = 1; i <= num; i++) {
    const password = `Password@${i}`;
    const email = `rohit+${i}@itobuz.com`;
    const isVerified = true;
    newUsers.push({ password, email, isVerified });
  }
  return newUsers;
};

const newUsers = generateUsers(10);

const seedUser = async () => {
  await user.deleteMany({});
  await user.insertMany(newUsers);
};

seedUser().then(() => {
  console.log("Successfully Created Users");
  mongoose.connection.close();
});
