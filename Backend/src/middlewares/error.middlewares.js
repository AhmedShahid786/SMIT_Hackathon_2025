import sendResponse from "../utils/sendResponse.utils.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  return sendResponse(
    res,
    500,
    null,
    false,
    `Internal server error => ${err.message}`
  );
};
