import asyncHandler from "../utils/asyncHandler.js";
import APIError from "../utils/apiError.js";
import { User } from "../models/liveTube/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import APIResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

// method to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const access_token = await user.generateAccessToken();
    const refresh_token = await user.generateRefreshToken();

    user.refresh_token = refresh_token;
    await user.save({ validateBeforeSave: false }); // no validation before saving the changes

    return { access_token, refresh_token };
  } catch (error) {
    throw new APIError(500, error?.message || "Unable to generate tokens");
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
  // get the data from the user
  // check if the user exists
  // check if the password is correct
  // generate access and refresh tokens [refresh token for let the user logged in, access token to validate the user]
  // send refresh token to the user's system cookie

  // get the user details through req.body
  const { email, password } = req.body;

  // check if the user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    // TODO: Throw error in proper way
    throw new APIError(401, "Invalid email address");
  }

  // check if the password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    // TODO: Throw error in proper way
    throw new APIError(401, "Invalid password");
  }

  // generate tokens
  const { access_token, refresh_token } = await generateAccessAndRefreshToken(
    user._id
  ); // tokens generated and inserted into database here, so make one more database query to get the token

  // Make database query
  const loggedInUser = await User.findById(user._id).select(
    "-password -refresh_token"
  ); // No need of mentioned fields

  // send refresh token to the user's system cookie
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day expiry
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, options)
    .json(
      new APIResponse(
        200, // status code
        {
          user: loggedInUser,
          access_token,
          refresh_token, // sending tokens here to the user to make sure if the user want to use the token then they can
        }, // response data
        "User logged in successfully" // response message
      )
    ); // accessToken and refreshToken are value returned by generateAccessAndRefreshToken
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
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
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day expiry
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json(new APIResponse(200, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // access refresh token from cookie
  const incomingRefreshToken =
    req.cookie.refresh_token || req.body.refresh_token;

  if (!incomingRefreshToken) {
    throw new APIError(401, "Unauthorized request");
  }

  try {
    // verify incoming refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // find user
    const user = await User.findById(decodedToken?._id);

    // if user is not valid
    if (!user) {
      throw new APIError(401, "Invalid refresh token");
    }

    // match incoming refresh token and refresh token stored in database
    if (incomingRefreshToken !== user?.refresh_token) {
      throw new APIError(401, "Refresh token is expired or invalid");
    }

    // if incoming refresh token and refresh token stored in database matched then generate new access token and refresh token for the user

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day expiry
      httpOnly: true,
      secure: true,
    };

    const { access_token, new_refresh_token } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("access_token", access_token, options)
      .cookie("refresh_token", new_refresh_token, options)
      .json(
        new APIResponse(
          200,
          {
            access_token,
            refresh_token: new_refresh_token,
          },
          "Access token refreshed successfully" // response message
        )
      );
  } catch (error) {
    throw new APIError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // check if the user is logged-in [ It will be handled in the route through auth middleware]
  // get the current password, new password and confirm new password from the user
  // get the user
  // check if the old password is matching with the password stored in the database
  // check if the new password and confirm new password are same
  // validate the new password
  // replace the old password with new password in the user's object [database]
  // save the operation

  const { current_password, new_password, confirm_new_password } = req.body;

  console.log(`Current password: ${current_password}`);
  console.log(`New password: ${new_password}`);
  console.log(`Confirm new password: ${confirm_new_password}`);

  const user = await User.findById(req.user._id);

  const isPasswordMatching = await user.isPasswordCorrect(current_password);

  if (!isPasswordMatching) {
    throw new APIError(401, "Current password is incorrect");
  }

  if (new_password !== confirm_new_password) {
    throw new APIError(
      400,
      "New Password and Confirm New Password doesn't match"
    );
  }

  user.password = new_password;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new APIResponse(200, {}, "Password updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // check if the user is logged-in [ It will be handled in the route through auth middleware]
  // get the user through request
  // return the fetched user

  const user = await User.findById(req.user._id).select(
    "-password -refresh_token"
  );

  return res.status(200).json(new APIResponse(200, { user }, "Current User"));
});

const updateUserData = asyncHandler(async (req, res) => {
  // get the data from the user
  // check if the user is logged-in [ It will be handled in the route through auth middleware]
  // get the user through request
  // update the user's data in the database

  const { first_name, last_name, phone } = req.body;

  if (!(first_name || last_name || phone)) {
    throw new APIError(400, "Please enter the details which you have to edit");
  }

  // get the user
  const user = await User.findByIdAndUpdate(req.user._id);

  console.log(`User is ${user}`);

  // update the value in the database
  user.first_name = first_name;
  user.save();
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserData,
};
