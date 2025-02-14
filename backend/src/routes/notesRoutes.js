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
  uploadFile,
} from "../controllers/notesController.js";
import { noteAttachment } from "../middlewares/multer.js";

const noteRouter = express.Router();

noteRouter.get("/getOne/:id", userAuthentication, getOne);
noteRouter.post("/getAll", userAuthentication, getAllNotes);
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
noteRouter.post(
  "/upload/:id",
  noteAttachment.single("uploadedFile"),
  userAuthentication,
  uploadFile
);

export default noteRouter;