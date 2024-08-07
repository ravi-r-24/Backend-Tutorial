import { Schema, models } from "mongoose";

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});
const orderSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    orderItems: [orderItemSchema],
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveryAddress: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamp: true }
);

export const Order = models("Order", orderSchema);
