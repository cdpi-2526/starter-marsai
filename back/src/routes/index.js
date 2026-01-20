import express from "express";
import userRouter from "./User.route.js";
import videoRouter from "./Video.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/videos", videoRouter);

export default router;
