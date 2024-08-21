import { Router } from "express";
import { register } from "../controller/user.js";

const router = new Router();

router.route("/register").post(register);

export default router;
