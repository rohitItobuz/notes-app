import { z } from "zod";

const username = z.string().trim().min(1, { message: "Username is Required" });
const password = z
  .string()
  .min(8, { message: "Password length should be 8 charecters" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      "Password should contain atleast one uppercase letter, one smallcase letter, one special charecter and one digit",
  });

export const userValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is Required" }),

  username: username,

  password: password,
});

export const loginValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is Required" }),

  password: password,
});

export const usernameValidationSchema = z.object({
  username: username,
});

export const passwordValidationSchema = z.object({
  newPassword: password,
  oldPassword: password,
});
