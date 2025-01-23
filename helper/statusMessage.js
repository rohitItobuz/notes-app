export const successMessage = (res, text) => {
  return res.json({
    status: 200,
    message: text,
    success: true,
  });
};

export const errorMessage = (res, text) => {
  return res.json({
    status: 404,
    message: text,
    success: false,
  });
};
