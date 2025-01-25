import actionModel from "../models/action.models.js";
import tokenModel from "../models/token.models.js";
import sendResponse from "../utils/sendResponse.utils.js";
import { addActionSchema } from "../validation/schemas.js";

//? Get actions for a particular token
const getActions = async (req, res) => {
  const { tokenId } = req.params;

  //* Check if tokenId is valid
  const token = await tokenModel.findById(tokenId);

  //* If token is not found, return an error
  if (!token) return sendResponse(res, 404, null, false, "Token not found");

  const actions = await actionModel.find({ token: tokenId });

  if (actions.length === 0)
    return sendResponse(
      res,
      404,
      null,
      false,
      "No actions found for this token"
    );

  return sendResponse(res, 200, actions, true, "Actions fetched successfully");
};

//? Controller for adding a new action
const addAction = async (req, res) => {
  //* Validate the incoming data
  const { error, value } = addActionSchema.validate(req.body);

  //* If validation fails, return error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* Add the actionBy field to the value object using user obj injected from middleware
  value.actionBy = req.user._id;

  //* Check if the token exists for the action
  const token = await tokenModel.findById(value.token).lean();
  if (!token) return sendResponse(res, 404, null, false, "Token not found");

  //* Create a new action
  const newAction = new actionModel({ ...value });
  await newAction.save();

  //* Push the action's ID to the actions array of the token
  await tokenModel.findByIdAndUpdate(
    value.tokenId,
    { $push: { actions: newAction._id } },
    { new: true }
  );

  return sendResponse(res, 201, newAction, true, "Action added successfully");
};

export { getActions, addAction };
