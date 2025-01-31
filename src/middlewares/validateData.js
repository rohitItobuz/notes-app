import { ZodError } from "zod";
import { errorMessage } from "../helper/statusMessage.js";

export const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.message}`,
        }));
        errorMessage(res, 400, errorMessages);
      } else {
        errorMessage(res);
      }
    }
  };
};
