//? Import required modules and libraries
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendResponse from "../utils/sendResponse.utils.js";
import userModel from "../models/user.models.js";

//? Middleware function to authenticate users using jwt token
export const authenticateUser = (allowedRoles) => async (req, res, next) => {
  try {
    //* Extract the token from the authorization header
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken.split(" ")[1];

    //* If token is not provided, return an error response
    if (!token)
      return sendResponse(res, 403, null, false, "Token not provided.");

    //* Verify the token using the secret key
    const decodedData = jwt.verify(token, process.env.AUTH_SECRET);

    //* If decoding fails, return an error response
    if (!decodedData)
      return sendResponse(res, 404, null, false, "Error in token decoding.");

    //* Find the user in database using the id from decoded data
    const user = await userModel.findById(decodedData._id).lean();
    //* If user does not exist, return an error response
    if (!user) return sendResponse(res, 404, null, false, "User not found.");

    // * Check access permission and reject or proceed the request based on access permission
    if (allowedRoles) {
      const accessAllowed = allowedRoles.find(
        (role) => role.toLowerCase() === user.role.toLowerCase()
      );
      if (!accessAllowed)
        return sendResponse(res, 403, null, false, "Access denied.");
    }
    req.user = user;
    next();
  } catch (err) {
    return sendResponse(res, 500, null, false, err.message);
  }
};
