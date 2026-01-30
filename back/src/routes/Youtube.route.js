import express from "express";

import multer from "multer";
import YoutubeController from "../controllers/YoutubeController.js";

import path from "path";
import fs from "fs";
const youtubeRouter = express.Router();

// Upload temporaire disque
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(req);
    // file.originalname contient le nom + extension
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

youtubeRouter.get("/auth", YoutubeController.googleAuth);
youtubeRouter.get("/auth/callback", YoutubeController.googleAuthCallback);
youtubeRouter.post(
  "/upload",
  upload.single("video"),
  YoutubeController.uploadVideo,
);

export default youtubeRouter;
