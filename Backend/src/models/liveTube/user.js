import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, min: 10, max: 10 },
    channel_name: { type: String, required: true, unique: true, index: true },
    password: {
      type: String,
      required: [true, "Password must be of at least 8 characters"],
      min: 8,
    }, // TODO: password encryption and decryption discussion
    avatar: { type: String, required: true }, // cloudnery hosted image link
    cover_photo: { type: String, required: true }, // cloudnery hosted image link
    watch_history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refresh_token: { type: String }, // TODO: have to discuss over it
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema);
