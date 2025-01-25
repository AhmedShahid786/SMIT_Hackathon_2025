import mongoose from "mongoose";
import sendResponse from "../utils/sendResponse.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import {
  editBeneficiarySchema,
  registerBeneficiarySchema,
} from "../validation/schemas.js";
import beneficiaryModel from "../models/beneficiary.models.js";

//? Get all beneficiaries
const getBeneficiaries = async (req, res) => {
  let { status, visit, addedBy } = req.query;
  let matchStage = {};

  if (status) matchStage.purposeStatus = status;
  if (visit) matchStage.visit = parseInt(visit);
  if (addedBy) matchStage.addedBy = new mongoose.Types.ObjectId(addedBy);

  const beneficiaries = await beneficiaryModel.aggregate([
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
  ]);

  if (beneficiaries.length === 0)
    return sendResponse(res, 404, null, false, "No beneficiaries found.");

  return sendResponse(
    res,
    200,
    beneficiaries,
    true,
    "Beneficiaries fetched successfully."
  );
};

//? Get a single beneficiary
const getSingleBeneficiary = async (req, res) => {
  const { name, cnic, number, id } = req.query;

  let queries = {};

  if (name) queries.name = name;
  if (cnic) queries.cnic = cnic;
  if (number) queries.number = number;
  if (id) queries._id = id;

  const beneficiary = await beneficiaryModel.findOne({ ...queries });

  //* If beneficiary does not exist in db, return an error response
  if (!beneficiary)
    sendResponse(res, 404, null, false, "Beneficiary not found.");

  return sendResponse(
    res,
    200,
    beneficiary,
    true,
    "beneficiary fetched successfully."
  );
};

//? Add a new beneficiary
const addBeneficiary = async (req, res) => {
  const { value, error } = registerBeneficiarySchema.validate(req.body);

  //* If validation fails, return an error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* If any of the images filed is missing, return an error response
  if (
    !req.files ||
    !req.files.image ||
    !req.files.image[0] ||
    !req.files["cnicImage.front"] ||
    !req.files["cnicImage.front"][0] ||
    !req.files["cnicImage.back"] ||
    !req.files["cnicImage.back"][0]
  ) {
    return sendResponse(res, 400, null, false, "All images are required.");
  }

  //* Upload all images on cloudinary
  const imageUrl = await uploadOnCloudinary(req.files.image[0].path);
  const cnicFrontUrl = await uploadOnCloudinary(
    req.files["cnicImage.front"][0].path
  );
  const cnicBackUrl = await uploadOnCloudinary(
    req.files["cnicImage.back"][0].path
  );

  //* Add the urls to relative fields
  value.image = imageUrl.url;
  value.cnicImage = {
    front: cnicFrontUrl.url,
    back: cnicBackUrl.url,
  };

  //* Add addedBy field using user obj injected in req obj by the authentication middleware
  value.addedBy = req.user._id;

  //* Save the new beneficiary to db and return saved beneficiary in response
  const newBeneficiary = new beneficiaryModel({ ...value });
  await newBeneficiary.save();
  return sendResponse(
    res,
    201,
    newBeneficiary,
    true,
    "Beneficiary added successfully."
  );
};

//? Edit an existing beneficiary
const editBeneficiary = async (req, res) => {
  const { name, cnic, number, id } = req.query;

  let queries;

  if (name) queries.name = name;
  if (cnic) queries.cnic = cnic;
  if (number) queries.number = number;
  if (id) queries._id = id;

  //* Validate the provided fields according to the schema
  const { value, error } = editBeneficiarySchema.validate(req.body);

  //* If validation fails, return an error response
  if (error) return sendResponse(res, 400, null, false, error.message);

  //* Check if beneficiary exists in db
  const beneficiaryExists = await beneficiaryModel.findOne({ ...queries });

  //* If beneficiary does not exist in db, return an error response
  if (!beneficiaryExists)
    return sendResponse(res, 404, null, false, "Beneficiary not found.");

  //* If image and CNIC images are provided, upload them on Cloudinary
  let imageUrl, cnicFrontUrl, cnicBackUrl;

  //* Check if any of the images is provided
  if (req.files) {
    //* If the image is provided and upload it to Cloudinary and add to value obj
    if (req.files.image && req.files.image[0]) {
      imageUrl = await uploadOnCloudinary(req.files.image[0].path);
      value.image = imageUrl.url;
    }

    //* If CNIC front image is provided and upload it to Cloudinary
    if (req.files["cnicImage.front"] && req.files["cnicImage.front"][0]) {
      cnicFrontUrl = await uploadOnCloudinary(
        req.files["cnicImage.front"][0].path
      );
      //* Add the URL of the uploaded CNIC front image to the relative field
      value.cnicImage.front = cnicFrontUrl.url;
    }

    //* Check if CNIC back image is provided and upload it to Cloudinary
    if (req.files["cnicImage.back"] && req.files["cnicImage.back"][0]) {
      cnicBackUrl = await uploadOnCloudinary(
        req.files["cnicImage.back"][0].path
      );
      //* Add the URL of the uploaded CNIC back image to the relative field
      value.cnicImage.back = cnicBackUrl.url;
    }
  }

  //* Update the beneficiary and only replace the fields provided
  const updatedBeneficiary = await beneficiaryModel.findOneAndUpdate(
    queries,
    { $set: { ...value } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedBeneficiary)
    return sendResponse(res, 404, null, false, "Failed to edit beneficiary.");

  return sendResponse(
    res,
    201,
    updatedBeneficiary,
    true,
    "Beneficiary edited successfully."
  );
};

export {
  getBeneficiaries,
  getSingleBeneficiary,
  addBeneficiary,
  editBeneficiary,
};
