import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controller/user.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover_photo", maxCount: 5 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
