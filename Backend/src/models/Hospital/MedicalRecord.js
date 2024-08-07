import { Schema, models } from "mongoose";

const medicalRecordSchema = new Schema({}, { timestamps: true });

export const MedicalRecord = models("MedicalRecord", medicalRecordSchema);
