import { mongoose, Schema } from "mongoose";
import user from "./userSchema.js";

const chat = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now() + 330 * 60000,
  }
});

export default mongoose.model("Chat", chat);
