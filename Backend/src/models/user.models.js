import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: true, index: true, lowercase: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    image: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "receptionist", "staff"],
      lowercase: true,
      required: true,
    },
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
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
