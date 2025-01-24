import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {
  deleteUser,
  editUser,
  getSingleUser,
  getTokenUser,
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/authenticate.middlewares.js";

const router = Router();

//? Route for fetching all users data
router.get("/", authenticateUser(), asyncHandler(getUsers));

//? Route for fetching single user's data using userId
router.get(":/id", authenticateUser(), asyncHandler(getSingleUser));

//? Route for fetching single user data using JWT Token
router.get("/cookie", authenticateUser(), asyncHandler(getTokenUser));

//? Route for registering a new user
router.post(
  "/register",
  upload.single("profileImg"),
  authenticateUser(),
  asyncHandler(registerUser)
);

//? Route for logging in a user
router.post("/login", asyncHandler(loginUser));

//? Route for editing an existing user
router.put(
  "/edit/:id",
  upload.single("editedImage"),
  authenticateUser(),
  asyncHandler(editUser)
);

//? Route for deleting an existing user
router.delete("/delete/:id", authenticateUser(), asyncHandler(deleteUser));

export default router;
