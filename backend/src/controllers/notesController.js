import path from "path";
import note from "../models/notesSchema.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";
import fs from "fs";
import user from "../models/userSchema.js";
import { statusCode } from "../config/constant.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const date = Date.now() + 330 * 60000;
    const targetNote = await note.findOne({ userId, title });
    if (targetNote)
      return errorMessage(
        res,
        statusCode.CONFLICT,
        "Note with this title is already present"
      );
    await note.create({ userId, title, content, date });
    return successMessage(
      res,
      statusCode.CREATED,
      "One note has been successfully created."
    );
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const targetNote = await note.findByIdAndDelete(req.params.id);
    if (!targetNote)
      return errorMessage(
        res,
        statusCode.NOT_FOUND,
        "This note does not exist"
      );
    successMessage(res, statusCode.OK, "Successfully deleted one note");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const targetNote = await note.findById(req.params.id);
    if (!targetNote)
      return errorMessage(
        res,
        statusCode.NOT_FOUND,
        "This note does not exist"
      );
    const checkUnique = await note.findOne({ userId, title });
    if (checkUnique && checkUnique._id.toString() !== req.params.id)
      return errorMessage(
        res,
        statusCode.CONFLICT,
        "Note with this title is already present."
      );
    targetNote.title = title;
    targetNote.content = content;
    targetNote.date = Date.now() + 330 * 60000;
    await targetNote.save();
    successMessage(res, statusCode.OK, "Successfully edited one note");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const getOne = async (req, res) => {
  try {
    const targetNote = await note
      .findById(req.params.id)
      .populate({ path: "userId", select: { username: 1, _id: 0 } });
    if (!targetNote)
      return errorMessage(
        res,
        statusCode.NOT_FOUND,
        "This note does not exist."
      );
    res.json({
      status: statusCode.CREATED,
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
    const { userId } = req.body;
    const title = req.query.title || "";
    const page = req.query.page || 1;
    const sortby = req.query.sortby || "date";
    const order = req.query.order || "desc";
    const limit = req.query.limit || 6;
    const regexpTitle = new RegExp("^" + title);
    const offset = (page - 1) * limit;
    const targetUser = await user.findById(userId);
    const targetNotes = await note
      .find(
        targetUser.role === "admin"
          ? { title: regexpTitle }
          : { userId, title: regexpTitle }
      )
      .sort({ [sortby]: order })
      .skip(offset)
      .limit(limit)
      .populate({ path: "userId", select: { username: 1, _id: 0 } });

    if (!targetNotes.length)
      return errorMessage(
        res,
        statusCode.NOT_FOUND,
        "No such note is present."
      );

    const totalNotes = await note.find(
      targetUser.role === "admin"
        ? { title: regexpTitle }
        : { userId, title: regexpTitle }
    );

    res.json({
      status: statusCode.CREATED,
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
    if (!req.file)
      return errorMessage(
        res,
        statusCode.UNSUPPORTED_MEDIA_TYPE,
        "No file uploaded."
      );
    const targetNote = await note.findById(req.params.id);
    if (!targetNote)
      return errorMessage(
        res,
        statusCode.NOT_FOUND,
        "This note does not exist"
      );
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
    successMessage(res, statusCode.CREATED, `File uploaded successfully`);
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
