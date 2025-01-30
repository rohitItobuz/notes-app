import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/userRoutes.js";
import noteRoute from "./routes/notesRoutes.js";
import { databaseConnect } from "./config/dbConnection.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/user", userRoute);
app.use("/notes", noteRoute);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});

databaseConnect();
