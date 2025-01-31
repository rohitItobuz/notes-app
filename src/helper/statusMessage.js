export const successMessage = (res, statusCode = 200, text) => {
  return res.json({
    status: statusCode,
    message: text,
    success: true,
  });
};

export const errorMessage = (
  res,
  statusCode = 500,
  text = "Internal Server Error"
) => {
  return res.json({
    status: statusCode,
    message: text,
    success: false,
  });
};
