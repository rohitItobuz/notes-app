import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { userValidationSchema } from "../validators/userValidation.js";
import { register, login, verifyEmail, verificationEmail } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", validateData(userValidationSchema), register);
userRoute.get("/verify/:token", verifyEmail);
userRoute.post('/email',verificationEmail);
userRoute.post("/login", validateData(userValidationSchema), login);

export default userRoute;
