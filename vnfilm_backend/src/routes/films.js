import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { checkAuthAdmin } from "../middlewares/check-auth.js";
import * as filmController from "../controller/films.js";
const __dirname = path.resolve();

const router = express.Router();

const filmUpload = (req, res, next) => {
  //  console.log(req.body);
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ message: "No files were uploaded." });
    return;
  }

  req.files.image.name = uuidv4() + path.extname(req.files.image.name);

  if (
    req.files.image.mimetype == "image/jpg" ||
    req.files.image.mimetype == "image/jpeg" ||
    req.files.image.mimetype == "image/png" ||
    req.files.image.mimetype == "image/gif"
  ) {
    req.files.image.mv(
      path.join(__dirname, "storage", req.files.image.name),
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
      message: "Only jpg, jpeg, png and gif are accepted",
    });
  }
};

router.post("/upload", checkAuthAdmin, filmUpload, filmController.createFilm);
router.get("/getone/:film_id", filmController.getOneFilm);
router.get("/filmhome", filmController.top8New);
router.get("/all-episode/:film_id", filmController.getEpisodeFilm);
router.get("/topview", filmController.getTopView);
router.get("/bycategory/:category_id", filmController.getByCategory);
router.get("/bycountry/:country_id", filmController.getByCountry);
router.get("/bytype/:handle", filmController.getByType);
router.get("/search", filmController.searchByText);
export default router;
