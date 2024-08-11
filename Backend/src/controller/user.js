import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  // get the data from the user
  // validate the data - [all mandatory data there, password pattern match]
  // check if user already exist
  // check for avatar
  // upload avatar to cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  // get the user details through req.body
  const { first_name, last_name, email, password, channel_name } = req.body;
  console.log(
    `first_name: ${first_name}, last_name: ${last_name}, email: ${email}, password: ${password}, channel_name: ${channel_name}`
  );

  res
    .status(200)
    .json({ message: `User registered successfully through controller` });
});

export { registerUser };
