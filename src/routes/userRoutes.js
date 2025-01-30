import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { userValidationSchema } from "../validators/userValidation.js";
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
} from "../controllers/userController.js";
import { profileUpload } from "../middlewares/multer.js";

const userRoute = express.Router();

userRoute.post("/email", verificationEmail);
userRoute.get("/verify/:token", verifyEmail);
userRoute.get("/regenerate-token", regenerateAccessToken);
userRoute.delete("/logout-one", userAuthentication, logoutOne);
userRoute.delete("/logout-all", userAuthentication, logoutAll);
userRoute.post("/login", validateData(userValidationSchema), login);
userRoute.post("/register", validateData(userValidationSchema), register);
userRoute.post(
  "/upload",
  profileUpload.single("uploadedFile"),
  userAuthentication,
  uploadProfile
);

export default userRoute;
