import user from "./userSchema.js";
import { mongoose, Schema } from "mongoose";

const session = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model("session", session);
