import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import user from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import { mailSend } from "../helper/mailSend.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";

dotenv.config();

export const verificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userPresent = await user.findOne({ email });
    if (userPresent.isVerified)
      return errorMessage(res, 409, "You are already verified.");
    const token = jwt.sign({ id: userPresent._id }, process.env.secretKey, {
      expiresIn: "5m",
    });
    mailSend(token, email);
    return successMessage(
      res,
      201,
      "Verification mail has been successfully sent."
    );
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);
    const userPresent = await user.findOne({ email });
    if (userPresent)
      return errorMessage(res, 409, "It seems you already have an account.");
    await user.create({ email, password: encryptedPass });
    verificationEmail(req, res);
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (err)
        return errorMessage(
          res,
          400,
          `Email verification failed, ${err.message}`
        );
      const id = decoded.id;
      const targetUser = await user.findById(id);
      if (targetUser.isVerified)
        return errorMessage(res, 409, "You are already verified.");
      targetUser.isVerified = true;
      await targetUser.save();
      successMessage(res, "Email verified successfully");
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) return errorMessage(res, 401, "Invalid credentials");

    if (!result.isVerified)
      return errorMessage(res, 401, "You are not verified.");

    const passwordMatch = await bcrypt.compare(password, result.password);
    if (!passwordMatch) return errorMessage(res, 401, "Invalid credentials");

    const id = result._id;
    const refreshToken = jwt.sign({ id }, process.env.secretKey, {
      expiresIn: "15d",
    });
    const accessToken = jwt.sign({ id }, process.env.secretKey, {
      expiresIn: "30m",
    });
    await session.create({ userId: id, refreshToken });
    return res.json({
      status: 201,
      refreshToken,
      accessToken,
      message: "You logged in successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const regenerateAccessToken = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (err) return errorMessage(res, 400, err.message);
      const id = decoded.id;
      const accessToken = jwt.sign({ id }, process.env.secretKey, {
        expiresIn: "30m",
      });
      return res.json({
        status: 201,
        accessToken,
        message: "Successfully change access token",
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const logoutAll = async (req, res) => {
  try {
    const userId = req.userId;
    await session.deleteMany({ userId });
    successMessage(res, "Successfully deleted all sessions");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const logoutOne = async (req, res) => {
  try {
    const userId = req.userId;
    const refreshToken = req.headers.authorization.replace("Bearer ", "");
    const targetUser = await session.findOneAndDelete({ userId, refreshToken });
    if (!targetUser) return errorMessage(res, 400, "Invalid refreshToken");
    successMessage(res, "Successfully deleted one session");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const uploadProfile = async (req, res) => {
  try {
    const id = req.userId;
    if (!req.file) return errorMessage(res, 400, "No file uploaded.");
    const fileName = path.join(
      "http://localhost:3000/uploads/user",
      req.file.filename
    );
    const result = await user.findByIdAndUpdate(id, { profile: fileName });
    if (!result) errorMessage(res, 400, "No file uploaded.");
    successMessage(
      res,
      201,
      `File uploaded successfully: ${req.file.filename}`
    );
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
