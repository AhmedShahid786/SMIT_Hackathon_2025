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
router.get("/", authenticateUser(), asyncHandler(getTokens));

//? Route for getting token using tokenId
router.get("/:id", authenticateUser(), asyncHandler(getSingleToken));

//? Route for generating a new token
router.post("/generate", authenticateUser(), asyncHandler(generateToken));

//? Route for editing an existing token
router.put("/edit/:id", authenticateUser(), asyncHandler(editToken));

export default router;
