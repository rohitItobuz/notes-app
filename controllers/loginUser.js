import bcrypt from "bcryptjs";
import user from "../models/userSchema.js";
import { errorMessage, successMessage } from "../helper/statusMessage.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) return errorMessage(res, "Invalid credentials");

    const passwordMatch = await bcrypt.compare(password, result.password);
    if (!passwordMatch) return errorMessage(res, "Wrong Password");

    result.login = true;
    await result.save();
    successMessage(res, "Successfully login user");
  } catch (error) {
    errorMessage(res, "Internal server error");
  }
};
