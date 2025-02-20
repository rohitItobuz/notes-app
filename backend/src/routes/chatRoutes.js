import express from "express";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import { getAllChat } from "../controllers/chatController.js";


const chatRoute = express.Router();

chatRoute.get("/getChat", userAuthentication, getAllChat);

export default chatRoute;