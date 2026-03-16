import fs from "fs";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Multer
 */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploadPath = `uploads/${req.userId}`;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },

  filename: function (req, file, callback) {
    const ext = file.originalname.split(".")[1];
    const uniqueName = `${req.userId}-${Date.now()}.${ext}`;
    callback(null, uniqueName);
  },
});

const upload = multer({ storage });

const filesToUpload = upload.fields([
  { name: "movie", maxCount: 1 },
  { name: "srt", maxCount: 1 },
  { name: "thumbnails", maxCount: 3 },
]);

const s3Client = new S3Client({
  region: "fr-par",
  endpoint: `https://s3.fr-par.scw.cloud`,
  credentials: {
    accessKeyId: "SCW3MFQBR803FXZS4N33",
    secretAccessKey: "c64db8bf-f541-478d-aa6a-cbcb8c7be2ae",
  },
});

const BUCKET_NAME = "can";
const FOLDER = "grp3";

function uploadToYoutube(req) {}

function uploadToS3(req) {
  // S3
  const file = req.files[key][0];
  const ext = file.originalname.split(".")[1];
  const uniqueName = `${req.userId}-${Date.now()}.${ext}`;
  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `${FOLDER}/${req.userId}/${uniqueName}`,
    Body: fs.createReadStream(file.path),
  });
  try {
    s3Client.send(uploadCommand);
    res.json({ message: "Fichier téléchargé " });
  } catch (err) {
    res.json({ error: err.message });
  }
}

function uploadFiles(req, res) {
  for (const key in req.files) {
    uploadToYoutube(req);
    uploadToS3(req);
  }
  res.json({ message: "Votre vidéo contient du spoil" });
}

export default { uploadFiles, filesToUpload };
