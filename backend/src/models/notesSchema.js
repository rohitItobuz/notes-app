import { mongoose, Schema } from "mongoose";
import user from './userSchema.js';

const notes = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  file: {
    type:String,
    default:"",
  }
});

export default mongoose.model("notes", notes);
