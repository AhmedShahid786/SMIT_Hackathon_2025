import mongoose from "mongoose";

const { Schema } = mongoose;
const tokenSchema = new Schema(
  {
    tokenId: { type: Number, required: true },
    beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "beneficiary" },
    department: {
      type: String,
      enum: [
        "health",
        "education",
        "food assistance",
        "general support",
        "employement",
      ],
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed"],
      default: "new",
    },
    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "action",
      },
    ],
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const tokenModel = mongoose.model("token", tokenSchema);
export default tokenModel;
