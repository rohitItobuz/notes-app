import { z } from "zod";

export const userRegistrationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is Required" }),
  password: z
    .string()
    .min(8, { message: "Password length should be 8 charecters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
      message:
        "Password should contain atleast one uppercase letter, one smallcase letter, one special charecter and one digit",
    }),
});

