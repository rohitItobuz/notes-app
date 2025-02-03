import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import user from "../src/models/userSchema.js";
import notes from "../src/models/notesSchema.js";
import { databaseConnect } from "../src/config/dbConnection.js";

databaseConnect();

const generateNotes = async (num) => {
  const newNotes = [];
  const allUsers = await user.find({});
  for (let i = 1; i <= num; i++) {
    const userIndex = Math.floor(Math.random() * allUsers.length);
    const userId = allUsers[userIndex]._id;
    const title = faker.internet.username() + "-" + i;
    const content = faker.lorem.sentences(1);
    newNotes.push({ userId, title, content });
  }
  return newNotes;
};

const seedNotes = async () => {
  const newNotes = await generateNotes(60);
  await notes.deleteMany({});
  await notes.insertMany(newNotes);
};

seedNotes().then(() => {
  console.log("Successfully Created Notes");
  mongoose.connection.close();
});
