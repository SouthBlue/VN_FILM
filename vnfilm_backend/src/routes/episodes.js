import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { checkAuthAdmin } from "../middlewares/check-auth.js";
import * as EpisodeController from "../controller/episodes.js";
const __dirname = path.resolve();
const router = express.Router();
const episodeUpload = (req, res, next) => {
  //  console.log(req.body);
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ message: "No files were uploaded." });
    return;
  }

  req.files.content.name = uuidv4() + path.extname(req.files.content.name);

  if (
    req.files.content.mimetype == "video/mp4" ||
    req.files.content.mimetype == "video/ogg" ||
    req.files.content.mimetype == "video/webm"
  ) {
    req.files.content.mv(
      path.join(__dirname, "storage/video", req.files.content.name),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        next();
      }
    );
  } else {
    return res.status(406).json({
      message: "Only mp4, ogg and webm are accepted",
    });
  }
};
router.post(
  "/upload",
  checkAuthAdmin,
  episodeUpload,
  EpisodeController.createEpisode
);
export default router;
