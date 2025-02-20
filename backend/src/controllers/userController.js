import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

import user from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import { mailSend } from "../helper/mailSend.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";
import { statusCode } from "../config/constant.js";

dotenv.config();

export const verificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userPresent = await user.findOne({ email });
    if (!userPresent)
      return errorMessage(
        res,
        statusCode.UNAUTHORIZED,
        "You are not registered."
      );
    if (userPresent.isVerified)
      return errorMessage(
        res,
        statusCode.CONFLICT,
        "You are already verified."
      );
    const token = jwt.sign(
      { id: userPresent._id, role: userPresent.role },
      process.env.secretKey,
      {
        expiresIn: "5m",
      }
    );
    await mailSend(token, email);
    return successMessage(
      res,
      statusCode.CREATED,
      "Verification mail has been successfully sent."
    );
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);
    const userPresent = await user.findOne({ email });
    if (userPresent)
      return errorMessage(
        res,
        statusCode.CONFLICT,
        "It seems you already have an account."
      );
    const checkUsername = await user.findOne({ username });
    if (checkUsername)
      return errorMessage(
        res,
        statusCode.CONFLICT,
        "Username is already present."
      );
    await user.create({ email, password: encryptedPass, username });
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
          statusCode.BAD_REQUEST,
          `Email verification failed, ${err.message}`
        );
      const id = decoded.id;
      const targetUser = await user.findById(id);
      targetUser.isVerified = true;
      await targetUser.save();
      successMessage(res, statusCode.OK, "Email verified successfully");
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const targetUser = await user.findOne({ email });
    if (!targetUser)
      return errorMessage(res, statusCode.UNAUTHORIZED, "Invalid credentials");

    if (!targetUser.isVerified)
      return errorMessage(
        res,
        statusCode.UNAUTHORIZED,
        "You are not verified."
      );

    const passwordMatch = await bcrypt.compare(password, targetUser.password);
    if (!passwordMatch)
      return errorMessage(res, statusCode.UNAUTHORIZED, "Invalid credentials");

    const id = targetUser._id;
    const refreshToken = jwt.sign(
      { id, role: targetUser.role },
      process.env.secretKey,
      {
        expiresIn: "15d",
      }
    );
    const accessToken = jwt.sign(
      { id, role: targetUser.role },
      process.env.secretKey,
      {
        expiresIn: "30m",
      }
    );
    await session.create({ userId: id, refreshToken });
    return res.json({
      status: statusCode.CREATED,
      data: {
        refreshToken,
        accessToken,
        email,
        username: targetUser.username,
        profile: targetUser.profile,
        role: targetUser.role,
      },
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
      if (err) return errorMessage(res, statusCode.BAD_REQUEST, err.message);
      const { id, role } = decoded;
      const accessToken = jwt.sign({ id, role }, process.env.secretKey, {
        expiresIn: "30m",
      });
      return res.json({
        status: statusCode.CREATED,
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
    const userId = req.body.userId;
    await session.deleteMany({ userId });
    successMessage(res, statusCode.OK, "Successfully deleted all sessions");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const logoutOne = async (req, res) => {
  try {
    const userId = req.body.userId;
    const refreshToken = req.headers.authorization.replace("Bearer ", "");
    const targetUser = await session.findOneAndDelete({ userId, refreshToken });
    if (!targetUser) return errorMessage(res, 400, "Invalid refreshToken");
    successMessage(res, statusCode.OK, "Successfully deleted one session");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const uploadProfile = async (req, res) => {
  try {
    const id = req.body.userId;
    if (!req.file)
      return errorMessage(res, statusCode.BAD_REQUEST, "No file uploaded.");
    const targetUser = await user.findById(id);
    if (targetUser.profile !== "") {
      const oldFilePath = targetUser.profile.replace(
        "http:/localhost:3000/",
        ""
      );
      fs.existsSync(oldFilePath) && fs.unlinkSync(oldFilePath);
    }
    const fileName = path.join(
      "http://localhost:3000/uploads/user",
      req.file.filename
    );
    const result = await user.findByIdAndUpdate(id, { profile: fileName });
    if (!result) errorMessage(res, statusCode.BAD_REQUEST, "No file uploaded.");
    return res.json({
      status: statusCode.CREATED,
      profile: fileName,
      message: "File uploaded successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { username, userId } = req.body;
    const checkUsername = await user.findOne({ username });
    if (checkUsername && checkUsername._id.toString() !== userId)
      return errorMessage(
        res,
        statusCode.CONFLICT,
        "Username is already present."
      );
    const targetUser = await user.findByIdAndUpdate(userId, { username });
    if (!targetUser)
      return errorMessage(res, statusCode.CONFLICT, "Username not changed");
    successMessage(res, statusCode.CREATED, "Username changed successfully.");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.body.userId;
    const targetUser = await user.findById(id);
    const passwordMatch = bcrypt.compareSync(oldPassword, targetUser.password);
    console.log(passwordMatch);
    if (!passwordMatch)
      return errorMessage(res, statusCode.BAD_REQUEST, "Wrong password.");
    targetUser.password = await bcrypt.hash(newPassword, 10);
    await targetUser.save();
    successMessage(res, statusCode.CREATED, "Password changed successfully.");
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const users = await user.find({ role: "admin" }, { _id: 0, password: 0 });
    if (!users.length)
      return errorMessage(res, statusCode.NOT_FOUND, "No Admin present.");
    return res.json({
      status: statusCode.CREATED,
      data: users,
      message: `Successfully get all admins`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
