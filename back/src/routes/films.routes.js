import express from "express";
import FilmController from "../controllers/FilmController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const films = express.Router();

films.use(AuthMiddleware(["PRODUCER"]));

films.post("/upload", FilmController.filesToUpload, FilmController.uploadFiles);

export default films;
