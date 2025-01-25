//? This file contains the Joi validation schemas for all expected requests.
import Joi from "joi";
import { token } from "morgan";

const registerUserSchema = Joi.object({
  name: Joi.string().max(20).required().messages({
    "string.max": "Fullname cannot exceed 20 characters.",
    "any.required": "Please provide your fullname.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
      "string.pattern.base":
        "Password must contain one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),

  image: Joi.any().optional(),

  role: Joi.string()
    .valid("admin", "receptionist", "staff")
    .required()
    .messages({
      "any.only": "Role must be one of admin, receptionist, or staff.",
      "any.required": "Role is required.",
    }),

  department: Joi.string()
    .valid(
      "health",
      "education",
      "food assistance",
      "general support",
      "employement"
    )
    .optional()
    .messages({
      "any.only":
        "Department must be one of health, education, food assistance, general support, or employement.",
    }),
});

const editUserSchema = Joi.object({
  name: Joi.string().max(20).optional().messages({
    "string.max": "Fullname cannot exceed 20 characters.",
  }),

  email: Joi.string().email().optional().messages({
    "string.email": "Please provide a valid email address.",
  }),

  password: Joi.string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .optional()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 20 characters.",
      "string.pattern.base":
        "Password must contain one uppercase letter, one lowercase letter, one number, and one special character.",
    }),

  image: Joi.string().uri().optional(),

  role: Joi.string()
    .valid("admin", "receptionist", "staff")
    .optional()
    .messages({
      "any.only": "Role must be one of admin, receptionist, or staff.",
    }),

  department: Joi.string()
    .valid(
      "health",
      "education",
      "food assistance",
      "general support",
      "employement"
    )
    .optional()
    .messages({
      "any.only":
        "Department must be one of health, education, food assistance, general support, or employement.",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.min": "Password must be atleast 8 characters long.",
      "string.max": "Password cannot exceed 20 chracters.",
      "string.pattern.base":
        "Password must contain one uppercase letter, one lowercase letter, one number and one special character.",
      "any.required": "Password is required.",
    }),
});

const registerBeneficiarySchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "string.max": "Name cannot exceed 100 characters.",
    "any.required": "Name is required.",
  }),

  cnic: Joi.number().required().min(1000000000000).max(9999999999999).messages({
    "number.min": "CNIC must be 13 digits long.",
    "number.max": "CNIC must be 13 digits long.",
    "any.required": "CNIC is required.",
  }),

  number: Joi.string().length(11).required().messages({
    "string.length": "Phone number must be exactly 11 digits.",
    "any.required": "Phone number is required.",
  }),

  address: Joi.string().required().messages({
    "any.required": "Address is required.",
  }),

  image: Joi.any().optional().messages({
    "any.required": "Image is required.",
  }),

  cnicImage: Joi.object({
    front: Joi.any().optional().messages({
      "any.required": "CNIC front image is required.",
    }),
    back: Joi.any().optional().messages({
      "any.required": "CNIC back image is required.",
    }),
  }).optional(),

  purpose: Joi.string().max(1000).required().messages({
    "string.max": "Purpose cannot exceed 1000 characters.",
    "any.required": "Purpose is required.",
  }),

  purposeStatus: Joi.string()
    .valid("pending", "approved", "rejected", "in-progress", "completed")
    .optional()
    .messages({
      "any.only":
        "Purpose status must be one of 'pending', 'approved', 'rejected', 'in-progress', or 'completed'.",
      "any.required": "Purpose status is required.",
    }),

  visit: Joi.number().optional().messages({
    "any.default": "Visit must be at least 1.",
  }),
});

const editBeneficiarySchema = Joi.object({
  name: Joi.string().max(100).optional().messages({
    "string.max": "Name cannot exceed 100 characters.",
  }),

  cnic: Joi.number().optional().min(1000000000000).max(9999999999999).messages({
    "number.min": "CNIC must be 13 digits long.",
    "number.max": "CNIC must be 13 digits long.",
  }),

  number: Joi.string().length(11).optional().messages({
    "string.length": "Phone number must be exactly 11 digits.",
  }),

  address: Joi.string().optional().messages({
    "any.required": "Address is required.",
  }),

  image: Joi.string().uri().optional(),

  cnicImage: Joi.object({
    front: Joi.string().uri().optional(),
    back: Joi.string().uri().optional(),
  }).optional(),

  purpose: Joi.string().max(1000).optional().messages({
    "string.max": "Purpose cannot exceed 1000 characters.",
  }),

  purposeStatus: Joi.string()
    .valid("pending", "approved", "rejected", "in-progress", "completed")
    .optional()
    .messages({
      "any.only":
        "Purpose status must be one of 'pending', 'approved', 'rejected', 'in-progress', or 'completed'.",
    }),

  visit: Joi.number().default(1).optional().messages({
    "any.default": "Visit must be at least 1.",
  }),

  addedBy: Joi.string().optional(),
});

const generateTokenSchema = Joi.object({
  beneficiary: Joi.string().length(24).hex().messages({
    "string.length": "Beneficiary ID must be a valid ObjectId.",
    "string.hex": "Beneficiary ID must be a valid ObjectId.",
  }),

  department: Joi.string()
    .valid(
      "health",
      "education",
      "food assistance",
      "general support",
      "employment"
    )
    .required()
    .messages({
      "any.required": "Department is required.",
      "any.only":
        "Department must be one of the following: health, education, food assistance, general support, employment.",
    }),

  status: Joi.string()
    .valid("new", "in-progress", "completed")
    .default("new")
    .messages({
      "any.only":
        "Status must be one of the following: new, in-progress, completed.",
    }),

  actions: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid action ID");
        }
        return value;
      })
    )
    .optional(),
});

const editTokenSchema = Joi.object({
  tokenId: Joi.number().optional().messages({
    "any.required": "Token ID is required.",
  }),

  beneficiary: Joi.string().length(24).hex().optional().messages({
    "string.length": "Beneficiary ID must be a valid ObjectId.",
    "string.hex": "Beneficiary ID must be a valid ObjectId.",
  }),

  department: Joi.string()
    .valid(
      "health",
      "education",
      "food assistance",
      "general support",
      "employment"
    )
    .optional()
    .messages({
      "any.only":
        "Department must be one of the following: health, education, food assistance, general support, employment.",
    }),

  status: Joi.string()
    .valid("new", "in-progress", "completed")
    .optional()
    .messages({
      "any.only":
        "Status must be one of the following: new, in-progress, completed.",
    }),

  actions: Joi.array()
    .items(
      Joi.object({
        actionBy: Joi.string().length(24).hex().optional().messages({
          "string.length": "ActionBy ID must be a valid ObjectId.",
          "string.hex": "ActionBy ID must be a valid ObjectId.",
        }),

        actionTaken: Joi.string().min(10).max(100).optional().messages({
          "string.min": "Action taken must be at least 10 characters long.",
          "string.max": "Action taken cannot exceed 100 characters.",
        }),

        remarks: Joi.string().min(30).max(300).optional().messages({
          "string.min": "Remarks must be at least 30 characters long.",
          "string.max": "Remarks cannot exceed 300 characters.",
        }),

        timestamp: Joi.date().default(Date.now),
      })
    )
    .optional(),
});

const addActionSchema = Joi.object({
  actionTaken: Joi.string().min(10).max(100).required().messages({
    "string.min": "Action taken must be at least 10 characters.",
    "string.max": "Action taken cannot exceed 100 characters.",
    "any.required": "Action taken is required.",
  }),

  remarks: Joi.string().min(30).max(300).optional().messages({
    "string.min": "Remarks must be at least 30 characters.",
    "string.max": "Remarks cannot exceed 300 characters.",
  }),

  token: Joi.string().length(24).hex().required().messages({
    "string.length": "Token ID must be a valid ObjectId.",
    "string.hex": "Token ID must be a valid ObjectId.",
    "any.required": "Token ID is required.",
  }),
});

export {
  registerUserSchema,
  loginSchema,
  editUserSchema,
  registerBeneficiarySchema,
  editBeneficiarySchema,
  generateTokenSchema,
  editTokenSchema,
  addActionSchema,
};
