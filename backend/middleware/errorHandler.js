exports.errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.log(err);

  res.status(500).json({
    errors: [err.message || "Something went wrong, please try again later"],
  });
};