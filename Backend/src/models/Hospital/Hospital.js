import { Schema, models } from "mongoose";

const hospitalSchema = new Schema({}, { timestamps: true });

export const Hospital = models("Hospital", hospitalSchema);
