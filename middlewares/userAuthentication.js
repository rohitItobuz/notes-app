import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import { errorMessage } from "../helper/statusMessage.js";
dotenv.config();

export const userAuthentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(accessToken, process.env.secretKey, async (err, decoded) => {
      if (err) return errorMessage(res, err.message);
      req.userId = decoded.id;
    });
    const targetUser = await user.findOne({ _id: req.userId });
    if (!targetUser) return errorMessage(res, "User is not found");
    if (!targetUser.isVerified) return errorMessage(res, "You are not verified.");
    const checkSession = await session.findOne({'userId' : req.userId});
    if (!checkSession) return errorMessage(res, "User is not authenticated");
    next();
  } catch (err) {
    errorMessage(res, "Internal Server Error");
  }
};
