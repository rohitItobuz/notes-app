import express from "express";
import { login } from "../controllers/loginUser.js";
import { createUser } from "../controllers/createUser.js";
import { verifyEmail } from "../controllers/emailVerify.js";

const route = express.Router();

route.post("/sign-up", createUser);
route.get('/verify/:token', verifyEmail);
route.post("/login", login);

export default route;
