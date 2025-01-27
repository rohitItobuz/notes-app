import user from "../models/userSchema.js";
import { errorMessage } from "../helper/statusMessage.js";

export const userAuthentication = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const findUser = await user.findOne({ '_id': userId, 'login': true });
    if (!findUser) return errorMessage(res, "User is not authenticated");
    next();
  } catch (e) {
    errorMessage(res, "Internal Server Error");
  }
};
