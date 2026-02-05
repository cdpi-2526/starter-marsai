import Model from "../models/index.js";
const { Award, Video } = Model;
function assignAward(req, res) {
  const { awardId, movieId } = req.params;

  // Tester si awardId il existe
  Award.findOne({ id: awardId }).then((award) => {
    Video.findOne({ id: movieId }).then((video) => {
      Award.update({ id: awardId }, { videoId: movieId })
        .then(() => {
          res
            .status(200)
            .json({ message: "Award assigned to video successfully" });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error assigning award to video",
            error: err,
          });
        });
    });
  });
}

export default { assignAward };
