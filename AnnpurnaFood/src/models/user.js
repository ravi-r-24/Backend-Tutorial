import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        userId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        order: { type: Schema.Types.ObjectId, ref: "Order" },
    },
    { timestamps: true }
);

export const User = model("User", userSchema);
