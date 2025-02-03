import { z } from "zod";

const userValidationObject = {
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .min(1, { message: "Email is Required" }),
  username: z.string().trim().min(1, { message: "Username is Required" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password length should be 8 charecters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
      message:
        "Use uppercase, lowercase, special, and digit in your password.",
    }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "Please confirm your password" }),
};

export const registerSchema = z.object({
  email: userValidationObject.email,
  username: userValidationObject.username,
  password: userValidationObject.password,
  confirmPassword: userValidationObject.confirmPassword,
}) .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is not the same as confirm password',
        path: ['confirmPassword'],
      })
    }
  })

export const logInSchema = z.object({
  email: userValidationObject.email,
  password: userValidationObject.password,
});
