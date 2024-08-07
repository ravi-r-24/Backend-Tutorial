import { Schema, models } from "mongoose";

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    diagnosedWith: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Transgender"],
      required: true,
    },
    admittedIn: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { timestamps: true }
);

export const Patient = models("Patient", patientSchema);
