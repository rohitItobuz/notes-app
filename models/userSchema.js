import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type: String
  },
  verify:{
    type: Boolean,
    default:false
  },
  login:{
    type: Boolean,
    default:false
  }
});

export default mongoose.model("notesUser", userSchema);