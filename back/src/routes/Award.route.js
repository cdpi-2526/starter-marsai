import express from "express";
import AwardController from "../controllers/AwardController.js";

const awardRouter = express.Router();

awardRouter.post("/:awardId/assign/:movieId", AwardController.assignAward);

export default awardRouter;
