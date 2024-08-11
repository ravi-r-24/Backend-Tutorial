import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    channel_name: { type: String, required: true, unique: true, index: true },
    password: {
      type: String,
      required: [true, "Password must be of at least 8 characters"],
      min: 8,
    }, // TODO: password encryption and decryption discussion
    avatar: { type: String, required: true }, // cloudnery hosted image link
    cover_photo: { type: String }, // cloudnery hosted image link
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

userSchema.pre("save", async function (next) {
  // check if password get modified or not
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// methods to check if the password is valid or not
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// methods to generate access token
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      channel_name: this.channel_name,
      avatar: this.avatar,
      cover_photo: this.cover_photo,
      watch_history: this.watch_history,
      first_name: this.first_name,
      last_name: this.last_name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  ); // This will return the access token
};

// method to generate refresh token
userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      channel_name: this.channel_name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  ); // This will return the refresh token
};

export const User = mongoose.model("User", userSchema);
