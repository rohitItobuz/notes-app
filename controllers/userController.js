import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import { mailSend } from "../emailVerify/mailSend.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";

dotenv.config();

export const verificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userPresent = await user.findOne({ email });
    if (userPresent.isVerified)
      return errorMessage(res, "You are already verified.");
    const token = jwt.sign({ id: userPresent._id }, process.env.secretKey, {
      expiresIn: "5m",
    });
    mailSend(token, email);
    return successMessage(res, "Verification mail has been successfully sent.");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);
    const userPresent = await user.findOne({ email });
    if (userPresent)
      return errorMessage(res, "It seems you already have an account.");
    await user.create({ email, password: encryptedPass });
    verificationEmail(req, res);
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (err)
        return errorMessage(res, `Email verification failed, ${err.message}`);
      const id = decoded.id;
      const result = await user.findByIdAndUpdate(id, { isVerified: true });
      if (!result) return errorMessage(res, "Email verification failed.");
      successMessage(res, "Email verified successfully");
    });
  } catch (err) {
    errorMessage(res, "Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) return errorMessage(res, "Invalid credentials");

    if (!result.isVerified) return errorMessage(res, "You are not verified.");

    const passwordMatch = await bcrypt.compare(password, result.password);
    if (!passwordMatch) return errorMessage(res, "Invalid credentials");

    const id = result._id;
    const refreshToken = jwt.sign({ id }, process.env.secretKey, {
      expiresIn: "15d",
    });
    const accessToken = jwt.sign({ id }, process.env.secretKey, {
      expiresIn: "30m",
    });
    await session.create({ userId: id, refreshToken });
    return res.json({
      status: 200,
      refreshToken,
      accessToken,
      message: "You logged in successfully",
      success: true,
    });
  } catch (error) {
    errorMessage(res, "Internal server error");
  }
};

export const regenerateAccessToken = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (err) return errorMessage(res, err.message);
      const id = decoded.id;
      const accessToken = jwt.sign({ id }, process.env.secretKey, {
        expiresIn: "30m",
      });
      return res.json({
        status: 200,
        accessToken,
        message: "Successfully change access token",
        success: true,
      });
    });
  } catch (error) {
    errorMessage(res, "Internal server error");
  }
};

export const logoutAll = async (req, res) => {
  try {
    const userId = req.userId;
    await session.deleteMany({ userId });
    successMessage(res, "Successfully deleted all sessions");
  } catch (err) {
    errorMessage(res, "Internal Server Errorrr");
  }
};

export const logoutOne = async (req, res) => {
  try {
    const userId = req.userId;
    const refreshToken = req.headers.authorization.replace("Bearer ", "");
    console.log(refreshToken);
    const targetUser = await session.findOneAndDelete({ userId, refreshToken });
    if (!targetUser) return errorMessage(res, "Invalid refreshToken");
    successMessage(res, "Successfully deleted one session");
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};
