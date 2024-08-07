import { Schema, models } from "mongoose";

const hospitalHourSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  specializedIn: { type: String, required: true },
});

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true, default: 0 },
    worksInHospitals: [hospitalHourSchema],
    fee: { type: Number, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    degree: { type: String, required: true },
  },
  { timestamps: true }
);

export const Doctor = models("Doctor", doctorSchema);
