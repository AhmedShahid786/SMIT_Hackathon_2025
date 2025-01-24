import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    fullname: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profileImg: { type: String, required: true },
    city: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
  },
  // role: {
  //   type: String,
  //   enum: ["admin", "branch manager", "city manager", "donor"],
  //   lowercase: true,
  // },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
