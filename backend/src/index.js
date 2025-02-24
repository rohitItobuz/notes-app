import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import userRoute from "./routes/userRoutes.js";
import noteRoute from "./routes/notesRoutes.js";
import chatRoute from "./routes/chatRoutes.js";
import { databaseConnect } from "./config/dbConnection.js";
import userSchema from "./models/userSchema.js";
import { saveChat } from "./controllers/chatController.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/user", userRoute);
app.use("/notes", noteRoute);
app.use("/chat", chatRoute);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

server.listen(port, () => {
  console.log(`Notes app listening on port ${port}`);
});

databaseConnect();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const accessToken = socket.handshake.headers.authorization.replace(
    "Bearer ",
    ""
  );
  jwt.verify(accessToken, process.env.secretKey, async (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.senderId = decoded.id;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("User connected", socket.senderId);
  socket.join(socket.senderId);

  socket.on("send_message", async (message) => {
    const targetUser = await userSchema.findOne({
      username: message.receiver.username,
    });
    if (targetUser) {
      socket.to(targetUser._id.toString()).emit("receive_message", message);
      await saveChat(socket.senderId, targetUser._id, message.content);
    } else {
      console.log("Receiver not connected");
    }
  });

  // socket.on("disconnect", () => {
  //   console.log("User disconnected:", socket.id);
  //   socket.leave(socket.senderId);
  // });
});
