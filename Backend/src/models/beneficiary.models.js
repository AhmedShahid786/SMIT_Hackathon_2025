import mongoose from "mongoose";

const { Schema } = mongoose;
const beneficiarySchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    cnic: {
      type: Number,
      required: true,
      unique: true,
      minlength: 13,
      maxlength: 13,
    },
    number: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
      unique: true,
    },
    address: { type: String, required: true },
    image: { type: String, required: true },
    cnicImage: {
      front: { type: String, required: true },
      back: { type: String, required: true },
    },
    purpose: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 1000,
    },
    purposeStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "approved", "rejected", "in-progress", "completed"],
    },
    visit: { type: Number, required: true, default: 1 },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const beneficiaryModel = mongoose.model("beneficiary", beneficiarySchema);
export default beneficiaryModel;
