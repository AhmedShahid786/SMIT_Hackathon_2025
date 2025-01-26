import express from "express";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { authenticateUser } from "../middlewares/authenticate.middlewares.js";
import {
  editToken,
  generateToken,
  getSingleToken,
  getTokens,
} from "../controllers/token.controllers.js";

const router = express.Router();

//? Route for getting all tokens
router.get("/", authenticateUser(["admin"]), asyncHandler(getTokens));

//? Route for getting token using tokenId
router.get(
  "/:id",
  authenticateUser(["admin", "staff"]),
  asyncHandler(getSingleToken)
);

//? Route for generating a new token
router.post(
  "/generate",
  authenticateUser(["admin", "receptionist"]),
  asyncHandler(generateToken)
);

//? Route for editing an existing token
router.put(
  "/edit/:id",
  authenticateUser(["admin", "staff"]),
  asyncHandler(editToken)
);

export default router;
