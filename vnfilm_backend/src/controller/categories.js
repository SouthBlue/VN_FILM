import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import Category from "../models/category.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getAllCategory = (req, res, next) => {
  Category.findAll({
    attributes: ["category_id", "category_name"],
  })
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({
          message: "Category null",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export {getAllCategory}