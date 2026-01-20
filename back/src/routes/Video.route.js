import express from "express";
// Importer le modèle Vidéo
const videoRouter = express.Router();

videoRouter.post("/upload", (req, res) => {
  // Code à faire
  res.send("Upload de vidéo");
});

export default videoRouter;
