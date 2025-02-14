import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import { errorMessage } from "../helper/statusMessage.js";
import { statusCode } from "../config/constant.js";
dotenv.config();

export const userAuthentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(accessToken, process.env.secretKey, async (err, decoded) => {
      if (err) return errorMessage(res, statusCode.UNAUTHORIZED, err.message);

      const targetUser = await user.findOne({ _id: decoded.id });
      if (!targetUser)
        return errorMessage(
          res,
          statusCode.UNAUTHORIZED,
          "User not authenticated"
        );
      if (!targetUser.isVerified)
        return errorMessage(
          res,
          statusCode.UNAUTHORIZED,
          "You are not verified."
        );

      const checkSession = await session.findOne({ userId: decoded.id });
      if (!checkSession)
        return errorMessage(
          res,
          statusCode.UNAUTHORIZED,
          "User not authenticated"
        );
      req.body.role = decoded.role;
      if (decoded.role === "admin" && req.body.normalUsername) {
        const normalUser = await user.findOne({
          username: req.body.normalUsername,
        });
        if (!normalUser)
          return errorMessage(res, statusCode.NOT_FOUND, "User not found");
        req.body.userId = normalUser._id;
      } else {
        req.body.userId = decoded.id;
      }
      next();
    });
  } catch (err) {
    console.log(err);
    errorMessage(res);
  }
};
