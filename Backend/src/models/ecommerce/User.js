import { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: {
      type: String,
      required: true,
      min: [8, "Password must be at least of 8 character"],
    },
    role: {
      type: String,
      enum: ["admin", "customer", "Seller"],
      default: "customer",
    },
  },
  { timestamps: true }
);

export const User = models("User", userSchema);
