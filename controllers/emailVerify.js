import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";

dotenv.config();

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (err) return errorMessage(res, "Email verification failed, possibly the link is invalid or expired.");

      const result = await user.findOne({ token });
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
