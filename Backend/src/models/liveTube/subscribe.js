import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema({}, { timeStamps: true });

export const Subscription = model("Subscription", subscriptionSchema);
