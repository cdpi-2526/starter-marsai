import express from "express";
import UploadController from "../controllers/UploadController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const films = express.Router();

films.use(AuthMiddleware(["PRODUCER"]));

films.post(
  "/upload",
  UploadController.filesToUpload,
  UploadController.uploadFiles,
);

export default films;
