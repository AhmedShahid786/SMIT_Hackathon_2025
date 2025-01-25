import z from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address.")
    .min(1, "Email is required."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password cannot exceed 20 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .min(1, "Password is required."),
});
