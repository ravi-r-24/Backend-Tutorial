import mongoose from "mongoose";
import { Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: [{ type: Schema.Types.ObjectId, ref: "Todo" }], // Array of subTodos
  },
  { timestamp: true }
);

export default mongoose.model("Todo", TodoSchema);
