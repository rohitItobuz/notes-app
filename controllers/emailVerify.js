import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";

dotenv.config();

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (err) {
        res.status(404).json({
          message:
            "Email verification failed, possibly the link is invalid or expired",
          success: false,
        });
      } else {
        const result = await user.findOne({ token });
        if (result) {
          result.verify = true;
          result.token = "";
          await result.save();

          res.json({
            status: 200,
            message: `Email verified successfully`,
            success: true,
          });
        }
      }
    });
  } catch (err) {
    res.status(404).json({
      message: "Email not verified",
      success: false,
    });
  }
};
