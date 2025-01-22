import bcrypt from "bcryptjs";
import user from "../models/userSchema.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) {
      res.json({
        status: 404,
        message: "Invalid credentials",
        success: false,
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, result.password);
      if (!passwordMatch) {
        res.json({
          status: 404,
          message: "Wrong Password",
          success: false,
        });
      } else {
        res.json({
          status: 200,
          message: "Successfully login user",
          success: true,
        });
      }
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
      success: false,
    });
  }
};
