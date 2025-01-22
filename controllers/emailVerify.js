import user from "../models/userSchema.js";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
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
  } catch (err) {
    res.status(404).json({
      message: "Email not verified",
      success: false,
    });
  }
};
