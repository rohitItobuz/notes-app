import dotenv from 'dotenv';
import express from 'express';
import { databaseConnect } from "./config/dbConnection.js";
import userRoute from './routes/userRoutes.js'
import noteRoute from './routes/notesRoutes.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});

app.use("/user", userRoute);
app.use("/notes", noteRoute);

databaseConnect();
