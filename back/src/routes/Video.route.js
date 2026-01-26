import express from "express";
import VideoController from "../controllers/VideoController.js";

const videoRouter = express.Router();

videoRouter.get("/", VideoController.getVideos);
videoRouter.post("/", VideoController.createVideo);

videoRouter.post("/upload", (req, res) => {
  // Code à faire
  res.send("Upload de vidéo");
});

export default videoRouter;
