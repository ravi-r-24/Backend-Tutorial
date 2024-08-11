// Try-catch method

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Async await method
const asyncHandler = (requestHandler) => (req, res) => {
  return requestHandler(req, res)
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((error) => {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    });
};

export default asyncHandler;
