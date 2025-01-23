import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { createNotes } from "../controllers/notesController.js";
import { noteValidationSchema } from "../validators/notesValidation.js";

const noteRouter = express.Router();

noteRouter.post("/create", validateData(noteValidationSchema) , createNotes);

export default noteRouter;