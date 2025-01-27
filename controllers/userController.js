import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import { mailSend } from "../emailVerify/mailSend.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);
    const token = jwt.sign({}, process.env.secretKey, { expiresIn: "5m" });
    const userPresent = await user.findOne({ email, 'verify': true });
    if (userPresent)
      return errorMessage(res, "It seems you already have an account.");
    await user.create({ email, password: encryptedPass, token });
    mailSend(token, email);
    return successMessage(res, "Your account has been successfully created.");
  } catch (err) {
    console.log(err)
    errorMessage(res, "Internal Server Error");
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.params;

    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      console.log('this' + decoded);
      if (err) return errorMessage(res, "Email verification failed, possibly the link is invalid or expired.");

      const result = await user.findOne({ email, token });
      if (!result) return errorMessage(res, "Email verification failed, possibly the link is invalid or expired.");

      result.verify = true;
      result.token = "";
      await result.save();
      successMessage(res, "Email verified successfully");
    });
  } catch (err) {
    errorMessage(res, "Email not verified");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email, "verify": true });
    if (!result) return errorMessage(res, "Invalid credentials");

    const passwordMatch = await bcrypt.compare(password, result.password);
    if (!passwordMatch) return errorMessage(res, "Wrong Password");

    result.login = true;
    await result.save();
    successMessage(res, "Successfully login user");
    return result._id.toString();
  } catch (error) {
    errorMessage(res, "Internal server error");
  }
};