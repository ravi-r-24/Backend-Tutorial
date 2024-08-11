import asyncHandler from "../utils/asyncHandler.js";
import APIError from "../utils/APIError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/liveTube/user.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // verify JWT token here
  // if valid, attach user to req.user
  // else, send an error response

  try {
    const token =
      res.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new APIError(401, "Unauthorized request");
    }

    // verify token using JWT library
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refresh_token"
    );

    // if user doesn't exist
    if (!user) {
      // TODO: Discuss about frontend
      throw new APIError(401, "Unauthorized request");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(error?.message || "Invalid access token", 401);
  }
});
