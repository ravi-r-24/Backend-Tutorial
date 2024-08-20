import { Router } from "express";

const router = Router();

// routes
router.route("/register").post((req, res) => {
    res.status(200).send(req.body);
});

export default router;
