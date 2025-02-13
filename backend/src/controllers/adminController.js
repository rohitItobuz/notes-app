import fs from "fs";

import user from "../models/userSchema.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";
import session from "../models/sessionSchema.js";
import notes from "../models/notesSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    if (req.body.role !== "admin")
      return errorMessage(res, 403, "User not authorized");
    const users = await user.find({ role: "user" }, { _id: 0 });
    if (!users.length) return errorMessage(res, 404, "No user present.");
    return res.json({
      status: 201,
      data: users,
      message: `Successfully get all users`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { role, userId } = req.body;
    if (role !== "admin") return errorMessage(res, 403, "User not authorized");
    const targetUser = await user.findById(userId);
    if (!targetUser) return errorMessage(res, 404, "No such user found.");

    if (targetUser.profile !== "") {
      const oldFilePath = targetUser.profile.replace(
        "http:/localhost:3000/",
        ""
      );
      fs.existsSync(oldFilePath) && fs.unlinkSync(oldFilePath);
    }
    await user.findByIdAndDelete(userId);
    await session.deleteMany({ userId });
    await notes.deleteMany({ userId });
    return successMessage(res, 200, "Successfully deleted one user.");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
