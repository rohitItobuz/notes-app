import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import { mailSend } from "../emailVerify/mailVerify.js";
dotenv.config();

export const createUser = async (req, res) => {
  try {
    const token = jwt.sign(
      {}, process.env.secretKey, { expiresIn: "5m" }
    );

    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);

    const newData = await user.create({ email, password: encryptedPass, token });
    mailSend(token, email);

    if (newData) {
      res.json({
        status: 200,
        message: "Successfully create user",
        success: true,
      });
    }
  } catch (err) {
    res.json({
      status: 404,
      message: "Failed to create user",
      success: false,
    });
  }
};
