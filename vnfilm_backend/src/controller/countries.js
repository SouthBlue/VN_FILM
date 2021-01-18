import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import Country from "../models/country.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getAllCountry = (req, res, next) => {
  Country.findAll({
    attributes: ["country_id", "country_name"],
  })
    .then((country) => {
      if (country) {
        //StatusCodes.OK
        res.status(200).json(country);
      } else {
        res.status(404).json({
          message: "Country null",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export {getAllCountry}