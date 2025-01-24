import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  //* Get the field name for customized error response
  const fieldName = file?.fieldname;

  if (!file && fieldName !== "editedImage") {
    //* If the req does not contain a file, throw an error
    cb(
      new Error(
        `${
          fieldName === "profileImg"
            ? "Profile image"
            : fieldName === "image"
              ? "Meal image"
              : "Image"
        } is required`
      ),
      false
    );
  } else if (allowedMimeTypes.includes(file.mimetype)) {
    //* Accept the file and proceed
    cb(null, true);
  } else {
    cb(
      new Error(
        `Only .jpeg, .jpg, and .png files are allowed for ${
          fieldName === "profileImg"
            ? "profile image"
            : fieldName === "image"
              ? "meal image"
              : "the image"
        }`
      ),
      false
    );
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});
