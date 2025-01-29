import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { userValidationSchema } from "../validators/userValidation.js";
import { register, login, verifyEmail, verificationEmail, regenerateAccessToken } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post('/email',verificationEmail);
userRoute.get("/verify/:token", verifyEmail);
userRoute.get('/regenerate-token',regenerateAccessToken);
userRoute.post("/login", validateData(userValidationSchema), login);
userRoute.post("/register", validateData(userValidationSchema), register);

export default userRoute;
