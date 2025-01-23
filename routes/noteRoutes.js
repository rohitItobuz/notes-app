import express from "express";
import { login } from "../controllers/loginUser.js";
import { createUser } from "../controllers/createUser.js";
import { validateData } from "../middlewares/validate.js";
import { verifyEmail } from "../controllers/emailVerify.js";
import { userRegistrationSchema } from "../validators/userValidation.js";

const route = express.Router();

route.post("/sign-up", validateData(userRegistrationSchema), createUser);
route.get("/verify/:token", verifyEmail);
route.post("/login", validateData(userRegistrationSchema) ,login);

export default route;
