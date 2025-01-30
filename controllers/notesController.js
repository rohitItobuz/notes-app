import note from "../models/notesSchema.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const targetNote = await note.findOne({ userId, title });
    if (targetNote)
      return errorMessage(res, "Note with this title is already present");
    await note.create({ userId, title, content });
    return successMessage(res, "One note has been successfully created.");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const deleteNote = async (req, res) => {
  try {
    const targetNote = await note.findByIdAndDelete(req.params.id);
    if (!targetNote) return errorMessage(res, "This note is not exist");
    successMessage(res, "Successfully deleted one note");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const targetNote = await note.findById(req.params.id);
    if (!targetNote) return errorMessage(res, "This note is not exist");
    const checkUnique = await note.findOne({ userId, title });
    if (checkUnique)
      return errorMessage(res, "Note with this title is already present.");
    targetNote.title = title;
    targetNote.content = content;
    targetNote.date = Date.now();
    await targetNote.save();
    successMessage(res, "Successfully edited one note");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const getOne = async (req, res) => {
  try {
    const targetNote = await note.findById(req.params.id);
    if (!targetNote) return errorMessage(res, "This note is not exist.");
    res.json({
      status: 200,
      data: targetNote,
      message: "Successfully fetch one note",
      success: true,
    });
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const { page } = req.params;
    const limit = 8;
    const offset = (page - 1) * limit;
    const targetNotes = await note.find({ userId }).skip(offset).limit(limit);;
    if (!targetNotes.length)
      return errorMessage(res, "No such note is present.");
    res.json({
      status: 200,
      data: targetNotes,
      message: `Successfully fetch ${targetNotes.length} notes`,
      success: true,
    });
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const searchNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, page } = req.params;
    const regexpTitle = new RegExp("^" + title);
    const limit = 8;
    const offset = (page - 1) * limit;
    const targetNotes = await note.find({ userId, title: regexpTitle }).skip(offset).limit(limit);;
    if (!targetNotes.length)
      return errorMessage(res, "No such note is present.");
    res.json({
      status: 200,
      data: targetNotes,
      message: `Successfully fetch ${targetNotes.length} notes`,
      success: true,
    });
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};