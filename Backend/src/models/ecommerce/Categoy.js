import { Schema, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = models("Category", categorySchema);
