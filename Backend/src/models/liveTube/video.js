import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: { type: String, required: true }, // cloudnery hosted video file link
    thumbnail: { type: String, required: true }, // cloudnery hosted image link
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: String, required: true }, // Cloudnery hosted video duration
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
