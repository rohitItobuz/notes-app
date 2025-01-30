import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { noteValidationSchema } from "../validators/notesValidation.js";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getOne,
  updateNote,
} from "../controllers/notesController.js";

const noteRouter = express.Router();

noteRouter.get("/getOne/:id", userAuthentication, getOne);
noteRouter.get("/getAll", userAuthentication, getAllNotes);
noteRouter.delete("/delete/:id", userAuthentication, deleteNote);
noteRouter.post(
  "/create",
  userAuthentication,
  validateData(noteValidationSchema),
  createNote
);
noteRouter.put(
  "/update/:id",
  userAuthentication,
  validateData(noteValidationSchema),
  updateNote
);

export default noteRouter;
