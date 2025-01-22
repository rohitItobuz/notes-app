import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import { mailSend } from "../emailVerify/mailVerify.js";

export const postData = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        data: "Token Data",
      },
      "ourSecretKey",
      { expiresIn: "1m" }
    );

    const { email, password } = req.body;
    const newData = await user.create({ email, password, token });
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
      message: "User is already present",
      success: false,
    });
  }
};
