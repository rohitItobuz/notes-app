import express from "express";
import { postData } from "../controllers/createUser.js";
import { verifyEmail } from "../controllers/emailVerify.js";

const route = express.Router();

route.post("/sign-up", postData);
route.get('/verify/:token', verifyEmail);

export default route;
