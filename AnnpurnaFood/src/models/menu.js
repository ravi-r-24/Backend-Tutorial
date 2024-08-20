import { Schema, model } from "mongoose";

const menuSchema = new Schema(
    {
        title: { type: String, required: true },
        item: [{ type: String, required: true }],
        restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    },
    { timestamps: true }
);

export const Menu = model("Menu", menuSchema);
