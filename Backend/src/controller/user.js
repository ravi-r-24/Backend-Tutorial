import asyncHandler from "../utils/asyncHandler.js";
import APIError from "../utils/apiError.js";
import { User } from "../models/liveTube/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import APIResponse from "../utils/apiResponse.js";

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
  const { first_name, last_name, email, password, channel_name, phone } =
    req.body;
  console.log(
    `first_name: ${first_name}, last_name: ${last_name}, email: ${email}, password: ${password}, channel_name: ${channel_name}`
  );

  // check if-any fields are empty
  if (
    [first_name, last_name, email, password, channel_name, phone].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new APIError(400, "All * marked fields are mandatory");
  }

  // check if user already exist
  const existingUser = User.findOne({
    $or: [{ channel_name }, { email }],
  });

  if (existingUser) {
    throw new APIError(409, "This email or channel_name already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverPhotoLocalPath = req.files?.cover_photo[0]?.path;

  // check if avatar provided
  if (!avatarLocalPath) {
    throw new APIError(400, "Avatar is mandatory");
  }

  // upload avatar to cloudinary
  const avatarResponse = await uploadOnCloudinary(avatarLocalPath);

  // upload cover image to cloudinary
  const coverPhotoResponse = await uploadOnCloudinary(coverPhotoLocalPath);

  if (!avatarResponse) {
    throw new APIError(500, "Failed to upload avatar");
  }

  // create object to store data in database
  const user = await User.create({
    first_name,
    last_name,
    email,
    password: await User.encryptPassword(password),
    channel_name,
    phone,
    avatar: avatarResponse.secure_url,
    cover_photo: coverPhotoResponse?.coverPhotoResponse.secure_url || "",
  });

  const newUser = await User.findById(user._id).select(
    "-password -refresh-token"
  );

  if (!newUser) {
    throw new APIError(500, "Failed to register user");
  }

  return res
    .status(201)
    .json(new APIResponse(200, newUser, "User registered successfully"));
});

export { registerUser };
