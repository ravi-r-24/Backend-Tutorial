import { Router } from "express";
import { registerUser } from "../controller/user.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "cover_image",
//       maxCount: 5,
//     },
//   ]),
//   registerUser
// );
// router.route("/login").post(loginUser);

export default router;
