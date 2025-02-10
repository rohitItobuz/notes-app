import express from "express";
import { validateData } from "../middlewares/validateData.js";
import {
  loginValidationSchema,
  passwordValidationSchema,
  usernameValidationSchema,
  userValidationSchema,
} from "../validators/userValidation.js";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import {
  login,
  register,
  logoutOne,
  logoutAll,
  verifyEmail,
  uploadProfile,
  verificationEmail,
  regenerateAccessToken,
  updateUsername,
  updatePassword,
} from "../controllers/userController.js";
import { profileUpload } from "../middlewares/multer.js";

const userRoute = express.Router();

userRoute.post("/email", verificationEmail);
userRoute.get("/verify", verifyEmail);
userRoute.get("/regenerate-token", regenerateAccessToken);
userRoute.delete("/logout-one", userAuthentication, logoutOne);
userRoute.delete("/logout-all", userAuthentication, logoutAll);
userRoute.post("/login", validateData(loginValidationSchema), login);
userRoute.post("/register", validateData(userValidationSchema), register);
userRoute.post(
  "/upload",
  profileUpload.single("uploadedFile"),
  userAuthentication,
  uploadProfile
);
userRoute.put(
  "/change-username",
  validateData(usernameValidationSchema),
  userAuthentication,
  updateUsername
);
userRoute.put(
  "/change-password",
  validateData(passwordValidationSchema),
  userAuthentication,
  updatePassword
);

export default userRoute;
