import { Router } from "express";
import { registerUser } from "../controller/user.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover_photo", maxCount: 5 },
  ]),
  registerUser
);

export default router;
