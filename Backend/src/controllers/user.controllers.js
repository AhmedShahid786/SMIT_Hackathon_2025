//? Import required modules and libraries
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import {
  registerUserSchema,
  loginSchema,
  editUserSchema,
} from "../validation/schemas.js";
import sendResponse from "../utils/sendResponse.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

//? Get all users
const getUsers = async (req, res) => {
  const { name, email, role, department } = req.query;
  const matchStage = {};

  if (name) matchStage.name = name;
  if (email) matchStage.email = email;
  if (role) matchStage.role = role;
  if (department) matchStage.department = department;

  const users = await userModel.aggregate([{ $match: matchStage }]);

  if (users.length === 0)
    return sendResponse(res, 404, null, false, "No users found.");

  //* Return success response with all users data
  return sendResponse(res, 200, users, true, "Users fetched successfully.");
};

//? Get single user via userId
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  //* If user does not exist in db, return an error response
  if (!user) sendResponse(res, 404, null, false, "User not found.");

  sendResponse(res, 200, user, true, "User fetched successfully.");
};

//? Get single user via JWT token
const getTokenUser = async (req, res) => {
  return sendResponse(
    res,
    200,
    req.user,
    true,
    "User data fetched successfully."
  );
};

//? Add a new user
const registerUser = async (req, res) => {
  try {
    //* Validate the request data using Joi schema
    const { error, value } = registerUserSchema.validate(req.body);

    //* If validation fails, return an error response
    if (error) return sendResponse(res, 400, null, false, error.message);

    //* Check if the user already exists in database
    const existingUser = await userModel.findOne({ email: value.email });

    //* If user already exists in database, return an error response
    if (existingUser)
      return sendResponse(
        res,
        403,
        null,
        false,
        "User with this email already exists."
      );

    //* Hash the password before saving to the database using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);
    value.password = hashedPassword;

    //* Upload the profile image to cloudinary
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    value.image = uploadedImage.url;

    //* Save the new user to the database
    let newUser = new userModel({ ...value });
    newUser = await newUser.save();

    //* Return success response with new-user data
    return sendResponse(
      res,
      201,
      newUser,
      true,
      "User registered successfully."
    );
  } catch (err) {
    console.log("Error", err);
    return sendResponse(res, 400, null, false, "Error registering user");
  }
};

//? Login a user
const loginUser = async (req, res) => {
  //* Validate the request data using Joi schema
  const { value, error } = loginSchema.validate(req.body);

  //* If validation fails, return an error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* Find the user in database by email
  const user = await userModel.findOne({ email: value.email }).lean();

  //* If user doesnot exist in database, return an error response
  if (!user)
    return sendResponse(
      res,
      404,
      null,
      false,
      "No user found with this email."
    );

  //* Check if the password is correct using bcrypt
  const isPasswordCorrect = await bcrypt.compare(value.password, user.password);

  //* If the password doesnot match, return an error response
  if (!isPasswordCorrect)
    return sendResponse(res, 403, null, false, "Invalid credentials.");

  //* Generate a JWT Token
  var token = jwt.sign(user, process.env.AUTH_SECRET);

  //* Return success response with the user data and the JWT token
  return sendResponse(
    res,
    200,
    { user, token },
    true,
    "User logged in successfully."
  );
};

//? Edit an existing user
const editUser = async (req, res) => {
  const { id } = req.params;

  //* Validate the provided fields according to the schema
  const { value, error } = editUserSchema.validate(req.body);

  //* If validation fails, return an error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* Check if user exists in db
  const userExists = await userModel.findById(id);

  //* If user does not exist in db, return an error response
  if (!userExists)
    return sendResponse(res, 404, null, false, "User not Found.");

  //* Create a new obj to include updated profile image, if provided
  const updatedUserObj = { ...value };

  //* If image is provided, then upload it on cloudinary
  let uploadedImage;
  if (req.file) {
    uploadedImage = await uploadOnCloudinary(req.file.path);
    updatedUserObj.image = uploadedImage.url;
  }

  //* Update the user and only replace the fields provided
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { $set: { ...updatedUserObj } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return sendResponse(res, 404, null, false, "Failed to edit user.");
  }

  return sendResponse(res, 201, updatedUser, true, "User edited successfully.");
};

//? Delete an existing user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  //* Check if user exists in db
  const userExists = await userModel.findById(id);

  //* If user does not exist in db, return an error response
  if (!userExists)
    return sendResponse(res, 404, null, false, "User not found.");

  //* Delete the user from db and return the deleted user in response
  const deletedUser = await userModel.findByIdAndDelete(id);

  return sendResponse(
    res,
    201,
    deletedUser,
    true,
    "User deleted successfully."
  );
};

export {
  getUsers,
  getSingleUser,
  getTokenUser,
  registerUser,
  loginUser,
  editUser,
  deleteUser,
};
