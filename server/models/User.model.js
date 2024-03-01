import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide unique User Name"],
    unique: [true, "Username exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String },
  address: { type: String },
  profile: { type: String },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
