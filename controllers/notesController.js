import { errorMessage, successMessage } from "../helper/statusMessage.js";
import note from "../models/notesSchema.js";

export const createNotes = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const findNote = await note.findOne({ userId, title });
    console.log(findNote);

    if (findNote)
      return errorMessage(res, "Note with  this title is already present");

    await note.create({ userId, title, content });
    return successMessage(res, "One note has been successfully created.");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};
