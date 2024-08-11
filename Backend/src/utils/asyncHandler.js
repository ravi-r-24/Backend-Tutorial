// Higher order function

// const higherOrderFunction = () => {};

// As it can take a function as argument
// const higherOrderFunction = () => {
//   const innerFunction = () => {
//     console.log("I am an inner function");
//   };
// };

// We can write the above higherOrderFunction as:
// const higherOrderFunction = () => () => {
//   console.log("I am an inner function");
// }; // Made the inner function as anonymous function

// TODO: Upgrade `asyncHandler` function to latest syntax
const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    Promise.resolve(await requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export default asyncHandler;

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
