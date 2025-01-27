import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { noteValidationSchema } from "../validators/notesValidation.js";
import { createNote, deleteNote, getAll, getOne, updateNote } from "../controllers/notesController.js";
import { userAuthentication } from "../middlewares/userAuthentication.js";

const noteRouter = express.Router();

noteRouter.post("/create", userAuthentication, validateData(noteValidationSchema), createNote);
noteRouter.post("/update/:id", userAuthentication, validateData(noteValidationSchema), updateNote);
noteRouter.delete("/delete/:id", userAuthentication, deleteNote);
noteRouter.get("/getOne/:id", userAuthentication, getOne);
noteRouter.get("/getAll/:title", userAuthentication, getAll);

export default noteRouter;