import fs from "fs";
import multer from "multer";



const upload = multer({ dest: "uploads" });

const filesToUpload = upload.fields([
  { name: "movie", maxCount: 1 },
  { name: "srt", maxCount: 1 },
  { name: "thumbnails", maxCount: 3 },
]);

function uploadFiles(req, res) {
  console.log(req.userId);
  // Créer le répertoire
  if (!fs.existsSync("uploads/" + req.userId)) {
    fs.mkdir("uploads/" + req.userId, function (err) {
      console.error(err);
    });
  }
  for (const property in req.files) {
    renameAndMove(req.files[property][0], req.userId);
  }
  res.json({ message: "OK" });
}

function renameAndMove(file, userId) {
  const [uploadDir, fileName] = file.path.split("/");
  const ext = file.originalname.split(".")[1];

  fs.rename(
    file.path,
    `${uploadDir}/${userId}/${fileName}.${ext}`,
    function (err) {
      if (err) {
        console.error(err.message);
      }
    },
  );
}

export default { uploadFiles, filesToUpload };
