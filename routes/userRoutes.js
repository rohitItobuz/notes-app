import express from "express";
import { validateData } from "../middlewares/validateData.js";
import { userValidationSchema } from "../validators/userValidation.js";
import { register, login, verifyEmail } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", validateData(userValidationSchema), register);
userRoute.get("/verify/:email/:token", verifyEmail);
userRoute.post("/login", validateData(userValidationSchema), login);

export default userRoute;
