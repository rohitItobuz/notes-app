import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import user from "../src/models/userSchema.js";
import { databaseConnect } from "../src/config/dbConnection.js";

databaseConnect();

const generateUsers = (num) => {
  const newUsers = [];
  for (let i = 1; i <= num; i++) {
    const password = bcrypt.hashSync(`Password${i}`, 10);
    const email = `rohit+${i}@itobuz.com`;
    const username = faker.internet.username();
    const isVerified = true;
    newUsers.push({ password, email, isVerified, username });
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
