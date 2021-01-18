import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import Type from "../models/movie-type.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getAllType = (req, res, next) => {
  Type.findAll({
    attributes: ["type_id", "type_name", "handle"],
  })
    .then((movie_type) => {
      if (movie_type) {
        //StatusCodes.OK
        res.status(200).json(movie_type);
      } else {
        res.status(404).json({
          message: "type null",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export {getAllType}