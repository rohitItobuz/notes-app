import path from "path";
import note from "../models/notesSchema.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";
import fs from "fs";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const date = Date.now() + 330 * 60000;
    const targetNote = await note.findOne({ userId, title });
    if (targetNote)
      return errorMessage(res, 409, "Note with this title is already present");
    await note.create({ userId, title, content, date });
    return successMessage(res, 201, "One note has been successfully created.");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const targetNote = await note.findByIdAndDelete(req.params.id);
    if (!targetNote) return errorMessage(res, 404, "This note does not exist");
    successMessage(res, 200, "Successfully deleted one note");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const targetNote = await note.findById(req.params.id);
    if (!targetNote) return errorMessage(res, 404, "This note does not exist");
    const checkUnique = await note.findOne({ userId, title });
    if (checkUnique && checkUnique._id != req.params.id)
      return errorMessage(res, 409, "Note with this title is already present.");
    targetNote.title = title;
    targetNote.content = content;
    targetNote.date = Date.now() + 330 * 60000;
    await targetNote.save();
    successMessage(res, 200, "Successfully edited one note");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const getOne = async (req, res) => {
  try {
    const targetNote = await note.findById(req.params.id, {
      userId: 0,
    });
    if (!targetNote) return errorMessage(res, 404, "This note does not exist.");
    res.json({
      status: 201,
      data: targetNote,
      message: "Successfully fetch one note",
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const title = req.query.title || "";
    const page = req.query.page || 1;
    const sortby = req.query.sortby || "date";
    const order = req.query.order || "desc";
    const limit = req.query.limit || 6;
    const regexpTitle = new RegExp("^" + title);
    const offset = (page - 1) * limit;
    const targetNotes = await note
      .find(
        { userId, title: regexpTitle },
        {
          userId: 0,
        }
      )
      .sort({ [sortby]: order })
      .skip(offset)
      .limit(limit);
    if (!targetNotes.length)
      return errorMessage(res, 404, "No such note is present.");
    const totalNotes = await note.find({ userId });
    res.json({
      status: 201,
      data: targetNotes,
      totalNotes: totalNotes.length,
      message: `Successfully fetch ${targetNotes.length} notes`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return errorMessage(res, 415, "No file uploaded.");
    const targetNote = await note.findById(req.params.id);
    if (!targetNote) return errorMessage(res, 404, "This note is not exist");
    const oldFilePath = targetNote.file.replace("localhost:3000/", "");
    if (targetNote.file && fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
    targetNote.file = path.join(
      "localhost:3000/uploads/note",
      req.file.filename
    );
    targetNote.date = Date.now() + 330 * 60000;
    await targetNote.save();
    successMessage(res, 201, `File uploaded successfully`);
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
