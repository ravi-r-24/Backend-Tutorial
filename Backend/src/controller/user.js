import asyncHandler from "../utils/asyncHandler.js";
import APIError from "../utils/apiError.js";
import { User } from "../models/liveTube/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import APIResponse from "../utils/apiResponse.js";

// method to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refresh_token = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(500, error.message);
  }
};

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

  // check if-any fields are empty
  // TODO: Error in this if clause
  if (
    [first_name, last_name, email, password, channel_name, phone].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new APIError(400, "All * marked fields are mandatory");
  }

  // check if user already exist
  const existingUser = await User.findOne({
    $or: [{ channel_name }, { email }],
  });

  if (existingUser) {
    throw new APIError(409, "This email or channel_name already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverPhotoLocalPath = req.files?.cover_photo[0]?.path;

  let coverPhotoLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.cover_photo) &&
    req.files.cover_photo.length > 0
  ) {
    coverPhotoLocalPath = req.files.cover_photo[0].path;
  }

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
    password,
    channel_name,
    phone,
    avatar: avatarResponse.secure_url,
    cover_photo: coverPhotoResponse?.secure_url || "",
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

const loginUser = asyncHandler(async (req, res) => {
  // get data
  // find email in database
  // password check
  // access token and refresh token
  // store refresh token in database
  // send cookies

  // get data
  const { email, password } = req.body;

  // error || no email || no password
  if (!email && !password) {
    throw new APIError(400, "Email is required");
  }

  // find email in database
  const user = await User.findOne({ email: email });

  // throw error if user not found
  if (!user) {
    throw new APIError(401, "Invalid email address");
  }

  // check password
  const isPasswordValid = await User.isPasswordCorrect(password);

  // throw error if password is incorrect
  if (!isPasswordValid) {
    throw new APIError(401, "Invalid password");
  }

  // access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // send tokens to the cookie of user system

  const loggedInUser = await User.findById(user._id);
  select("-password -refresh-token");

  // design option for cookies
  const options = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true for production
  };

  return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, options)
    .json(
      new APIResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User is authenticated"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // remove cookies
  // remove refresh token

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refresh_token: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true for production
  };

  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json(new APIResponse(200, null, "User is logged out"));
});

export { registerUser, loginUser, logoutUser };
