import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import { mailSend } from "../emailVerify/mailSend.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";
dotenv.config();

export const createUser = async (req, res) => {
  try {
    const token = jwt.sign({}, process.env.secretKey, { expiresIn: "5m" });
    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);

    const userPresent = await user.findOne({ email });
    if (userPresent)
      return errorMessage(res, "It seems you already have an account.");

    await user.create({ email, password: encryptedPass, token });
    mailSend(token, email);
    return successMessage(res, "Your account has been successfully created.");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};
