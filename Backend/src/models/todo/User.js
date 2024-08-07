import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Can't store user without name"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required to send you all updates"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password keeps your account secured"],
      min: [8, "Password must be at least 8 characters"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
