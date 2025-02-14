import { statusCode } from "../config/constant.js";

export const successMessage = (res, status, text) => {
  return res.json({
    status: status,
    message: text,
    success: true,
  });
};

export const errorMessage = (
  res,
  status = statusCode.INTERNAL_SERVER_ERROR,
  text = "Internal Server Error"
) => {
  return res.json({
    status: status,
    message: text,
    success: false,
  });
};
