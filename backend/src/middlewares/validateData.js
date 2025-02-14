import { ZodError } from "zod";
import { errorMessage } from "../helper/statusMessage.js";
import { statusCode } from "../config/constant.js";

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
        errorMessage(res, statusCode.BAD_REQUEST, errorMessages);
      } else {
        errorMessage(res);
      }
    }
  };
};
