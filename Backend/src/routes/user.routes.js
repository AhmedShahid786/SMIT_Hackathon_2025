import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {
  getUsers,
  getSingleUser,
  getTokenUser,
  registerUser,
  loginUser,
  deleteUser,
  editUser,
} from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/authenticate.middlewares.js";

const router = Router();

//? Route for fetching all users data
router.get("/", authenticateUser(["admin"]), asyncHandler(getUsers));

//? Route for fetching single user data using JWT Token
router.get(
  "/cookie",
  authenticateUser(["admin", "receptionist", "staff"]),
  asyncHandler(getTokenUser)
);

//? Route for fetching single user's data using userId
router.get("/:id", authenticateUser(["admin"]), asyncHandler(getSingleUser));

//? Route for registering a new user
router.post(
  "/register",
  authenticateUser(["admin"]),
  upload.single("image"),
  asyncHandler(registerUser)
);

//? Route for logging in a user
router.post("/login", asyncHandler(loginUser));

//? Route for editing an existing user
router.put("/edit/:id", authenticateUser(["admin"]), asyncHandler(editUser));

//? Route for deleting an existing user
router.delete(
  "/delete/:id",
  authenticateUser(["admin"]),
  asyncHandler(deleteUser)
);

export default router;
