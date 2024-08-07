import { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    thumbnailURL: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sold: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    ratings: { type: Number, default: 0 },
    numRatings: { type: Number, default: 0 },
    availability: { type: Boolean, default: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = models("Product", productSchema);
