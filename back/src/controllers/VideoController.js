import Video from "../models/Video.js";
import { videoDuration } from "@numairawan/video-duration";

// Liste
function getVideos(req, res) {
  Video.findAll().then((videos) => {
    res.json(videos);
  });
}

// Création
function createVideo(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  Video.findOne({ where: { title } }).then((video) => {
    if (video) {
      res.json(video);
    } else {
      Video.create({ title: title, description: description }).then(
        (newVideo) => {
          res.status(201).json(newVideo);
        },
      );
    }
  });
}

function getVideoDuration(req, res) {
  const videoId = req.params.id;

  // Using a local video file (Node.js)
  const localVideoPath = `uploads/${videoId}.mp4`;

  console.log(`Getting duration for video at path: ${localVideoPath}`);
  videoDuration(localVideoPath)
    .then((duration) => {
      res.json({ duration: duration });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la durée" });
    });
}

export default { getVideos, createVideo, getVideoDuration };
