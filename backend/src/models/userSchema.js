import { mongoose, Schema } from "mongoose";

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  username:{
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profile: {
    type:String,
    default:"",
  }
});

export default mongoose.model("notesUser", user);
