import mongoose from "mongoose";
import sendResponse from "../utils/sendResponse.utils.js";
import { editTokenSchema, generateTokenSchema } from "../validation/schemas.js";
import tokenModel from "../models/token.models.js";

//? Get all tokens
const getTokens = async (req, res) => {
  let { status } = req.query;
  let matchStage = {};

  if (status) matchStage.status = status;

  const tokens = await tokenModel.aggregate([
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
  ]);

  if (tokens.length === 0)
    return sendResponse(res, 404, null, false, "No tokens found.");

  return sendResponse(res, 200, tokens, true, "Tokens fetched successfully.");
};

//? Get a single token
const getSingleToken = async (req, res) => {
  let { id } = req.params;

  const token = await tokenModel.findOne({ tokenId: id });

  if (!token) return sendResponse(res, 404, null, false, "Token not found.");

  return sendResponse(res, 200, token, true, "Token fetched successfully.");
};

//? Generate a new token
const generateToken = async (req, res) => {
  const { value, error } = generateTokenSchema.validate(req.body);

  //* If validation fails, return an error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* Add addedBy field using user obj injected in req obj by the authentication middleware
  value.generatedBy = req.user._id;
  value.tokenId = Math.floor(100000 + Math.random() * 900000);

  //* Save the new token to db and return saved token in response
  const generatedToken = new tokenModel({ ...value });
  await generatedToken.save();
  return sendResponse(
    res,
    201,
    generatedToken,
    true,
    "Token generated successfully."
  );
};

//? Edit an existing token
const editToken = async (req, res) => {
  const { id } = req.params;

  //* Validate the provided fields according to the schema
  const { value, error } = editTokenSchema.validate(req.body);

  //* If validation fails, return an error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* Check if beneficiary exists in db
  const tokenExists = await tokenModel.findOne({ tokenId: id });

  //* If token does not exist in db, return an error response
  if (!tokenExists)
    return sendResponse(res, 404, null, false, "Token not found.");

  //* Update the token and only replace the fields provided
  const updatedToken = await tokenModel.findOneAndUpdate(
    { tokenId: id },
    { $set: { ...value } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedToken)
    return sendResponse(res, 404, null, false, "Failed to edit token.");

  return sendResponse(
    res,
    201,
    updatedToken,
    true,
    "Token edited successfully."
  );
};

export { getTokens, getSingleToken, generateToken, editToken };
