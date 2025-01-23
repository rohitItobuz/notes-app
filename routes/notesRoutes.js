import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { createNote, deleteNote, updateNote } from "../controllers/notesController.js";
import { noteValidationSchema } from "../validators/notesValidation.js";

const noteRouter = express.Router();

noteRouter.post("/create", validateData(noteValidationSchema) , createNote);
noteRouter.post("/update/:id", validateData(noteValidationSchema) , updateNote);
noteRouter.delete("/delete/:id", deleteNote);

export default noteRouter;