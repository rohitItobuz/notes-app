import { errorMessage, successMessage } from "../helper/statusMessage.js";
import note from "../models/notesSchema.js";

export const createNote = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const findNote = await note.findOne({ userId, title });
        if (findNote) return errorMessage(res, "Note with this title is already present");
        await note.create({ userId, title, content });
        return successMessage(res, "One note has been successfully created.");
    } catch (err) {
        errorMessage(res, "Internal Server Error");
    }
};

export const deleteNote = async (req, res) => {
    try {
        const result = await note.findByIdAndDelete(req.params.id);
        if (!result) return errorMessage(res, "This note is not exist");
        successMessage(res, "Successfully deleted one note");
    } catch (err) {
        errorMessage(res, "Internal Server Error");
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const result = await note.findByIdAndUpdate(req.params.id, { title, content });
        if (!result) return errorMessage(res, "This note is not exist");
        successMessage(res, "Successfully edited one note");
    } catch (err) {
        errorMessage(res, "Internal Server Error");
    }
};
