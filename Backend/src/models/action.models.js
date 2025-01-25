import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    actionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    actionTaken: {
      type: String,
      minlength: 10,
      maxlength: 100,
    },
    remarks: { type: String, minlength: 30, maxlength: 300 },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "token",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const actionModel = mongoose.model("action", actionSchema);
export default actionModel;
