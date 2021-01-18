import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import User from "../models/user.js";
import Film from "../models/film.js";
import Marked from "../models/movie-marked.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Marker = async (req, res) => {
  try {
    const marked = await Marked.create({
      user_id: req.body.user_id,
      film_id: req.body.film_id,
    });
    if (marked) {
      return res.status(201).json({
        message: "Marked",
      });
    } else {
      return res.status(500).json({
        message: "Mark faild",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Mark faild",
    });
  }
};
const Unmarked = async (req, res) => {
  try {
    const marked = await Marked.destroy({
      where: { user_id: req.query.user_id, film_id: req.query.film_id },
    });
    if (marked) {
      return res.status(200).json({
        message: "Unmarked success",
      });
    } else {
      return res.status(500).json({
        message: "Unmarked faild",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Unmarked faild",
    });
  }
};
const getOneMarked = async (req, res) => {
  try {
    const marked = await Marked.findOne({
      where: { user_id: req.query.user_id, film_id: req.query.film_id },
    });
    if (marked) {
      return res.status(200).json({
        found: true,
        message: "Marked",
      });
    } else {
      return res.status(200).json({
        found: false,
        message: "Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
const getAllByUser = async (req, res) => {
  try {
    const film = await Marked.findAndCountAll({
      where: { user_id: req.params.user_id },
      raw: true,
      attributes: [],
      limit: 15,
      offset: (req.query.page - 1) * 15,
      include: [
        {
          model: Film,
          attributes: [
            "film_id",
            "film_name",
            "film_name_real",
            "status",
            "image",
          ],
        },
      ],
      order: [["film_id", "DESC"]],
    });
    const filmlist = film.rows.map((film) => {
      return {
        film_id: film["film.film_id"],
        film_name: film["film.film_name"],
        film_name_real: film["film.film_name_real"],
        status: film["film.status"],
        image: film["film.image"],
      };
    });
    if (film.count > 0) {
      return res.status(200).json({
        status: true,
        count: film.count,
        film_list: filmlist,
      });
    } else
      return res.status(200).json({
        status: false,
        message: "Film Marked null",
      });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export { Marker, Unmarked, getOneMarked, getAllByUser };
