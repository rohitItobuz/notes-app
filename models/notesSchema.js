import { mongoose, Schema } from "mongoose";
import user from './userSchema.js'

const notesSchema = new Schema({
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
});

export default mongoose.model("notes", notesSchema);
