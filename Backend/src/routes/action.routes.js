import express from "express";
import { authenticateUser } from "../middlewares/authenticate.middlewares.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { addAction, getActions } from "../controllers/action.controllers.js";

const router = express.Router();

//? Route for getting actions based on tokenId
router.get(
  "/:tokenId",
  authenticateUser(["admin", "staff"]),
  asyncHandler(getActions)
);

//? Route for adding a new action
router.post(
  "/add",
  authenticateUser(["admin", "staff"]),
  asyncHandler(addAction)
);

export default router;
