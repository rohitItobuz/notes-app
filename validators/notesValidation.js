import { z } from "zod";

export const noteValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is Required" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content is Required" }),
});