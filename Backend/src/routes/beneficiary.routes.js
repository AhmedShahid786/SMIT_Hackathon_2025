import express from "express";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {
  getBeneficiaries,
  getSingleBeneficiary,
  addBeneficiary,
  editBeneficiary,
} from "../controllers/beneficiary.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { authenticateUser } from "../middlewares/authenticate.middlewares.js";

const router = express.Router();

//? Route for getting all beneficiaries
router.get("/", authenticateUser(["admin"]), asyncHandler(getBeneficiaries));

//? Route for getting a single beneficiary
router.get(
  "/single",
  authenticateUser(["admin", "receptionist"]),
  asyncHandler(getSingleBeneficiary)
);

//? Route for adding a new beneficiary
router.post(
  "/add",
  authenticateUser(["admin", "receptionist"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cnicImage.front", maxCount: 1 },
    { name: "cnicImage.back", maxCount: 1 },
  ]),
  asyncHandler(addBeneficiary)
);

//? Route for editing an existing beneficiary
router.put(
  "/edit/:id",
  authenticateUser(["admin", "receptionist"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cnicImage.front", maxCount: 1 },
    { name: "cnicImage.back", maxCount: 1 },
  ]),
  asyncHandler(editBeneficiary)
);
export default router;
