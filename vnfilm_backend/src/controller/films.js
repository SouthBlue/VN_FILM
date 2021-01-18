import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import User from "../models/user.js";
import Film from "../models/film.js";
import CategoryFilm from "../models/category-film.js";
import Country from "../models/country.js";
import Episode from "../models/episode.js";
import Category from "../models/category.js";
import Type from "../models/movie-type.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
const createFilm = (req, res) => {
  const {
    film_name,
    film_name_real,
    status,
    director,
    type_id,
    country_id,
    year,
    description,
    tag,
    category,
  } = req.body;
  let arrCategories = category.split(",");
  Film.create(
    {
      film_name,
      film_name_real,
      status,
      director,
      type_id,
      country_id,
      year,
      image: req.files.image.name,
      description,
      num_view: 0,
      tag,
    },
    {
      fields: [
        "film_name",
        "film_name_real",
        "status",
        "director",
        "type_id",
        "country_id",
        "year",
        "image",
        "description",
        "num_view",
        "tag",
      ],
    }
  )
    .then((result) => {
      if (result) {
        arrCategories.map((category) => {
          CategoryFilm.create({
            film_id: result.film_id,
            category_id: category,
          });
        });
      }
      return res.status(201).json({
        message: "Film created",
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      });
    });
};
const getOneFilm = async (req, res) => {
  try {
    const film = await Film.findOne({
      where: { film_id: req.params.film_id },
    });
    if (film) {
      const country = Country.findOne({
        where: { country_id: film.country_id },
      });
      const categoryfilm = await CategoryFilm.findAll({
        where: { film_id: film.film_id },
        raw: true,
        attributes: [],
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      });
      let categorystr = "";
      const categorylist = categoryfilm.map((category) => {
        categorystr = categorystr + category["category.category_name"] + ", ";
      });
      if (country && categorystr !== "") {
        return res.status(200).json({
          film_id: film.film_id,
          film_name: film.film_name,
          film_name_real: film.film_name_real,
          status: film.status,
          director: film.director,
          country: country.country_name,
          year: film.year,
          image: `${process.env.HOST}files/${film.image}`,
          description: film.description,
          category: categorystr,
        });
      } else {
        return res.status(500).json({
          message: error,
        });
      }
    } else {
      return res.status(404).json({
        message: "Film not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const top8New = async (req, res) => {
  try {
    const singleMovie = await Film.findAll({
      where: { type_id: 1 },
      limit: 8,
      order: [["film_id", "DESC"]],
      attributes: ["film_id", "film_name", "film_name_real", "status", "image"],
    });
    const seriesMovie = await Film.findAll({
      where: { type_id: 2 },
      limit: 8,
      order: [["film_id", "DESC"]],
      attributes: ["film_id", "film_name", "film_name_real", "status", "image"],
    });
    const theaterMovie = await Film.findAll({
      where: { type_id: 3 },
      limit: 8,
      order: [["film_id", "DESC"]],
      attributes: ["film_id", "film_name", "film_name_real", "status", "image"],
    });
    if (
      singleMovie.length > 0 &&
      seriesMovie.length > 0 &&
      theaterMovie.length > 0
    ) {
      return res.status(200).json({
        fileHost: `${process.env.HOST}files/`,
        singleMovie: singleMovie,
        seriesMovie: seriesMovie,
        theaterMovie: theaterMovie,
      });
    } else return res.status(404).json({ message: "Error load home page" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getEpisodeFilm = async (req, res) => {
  try {
    const film = await Film.findOne({
      where: { film_id: req.params.film_id },
      attributes: [
        "film_id",
        "film_name",
        "film_name_real",
        "num_view",
        "image",
        "description",
      ],
    });
    if (film) {
      const episode = await Episode.findAll({
        where: { film_id: req.params.film_id },
        attributes: ["episode_id", "episode", "episode_name", "content"],
      });
      const updateFilm = await Film.update(
        { num_view: film.num_view + 1 },
        { where: { film_id: req.params.film_id } }
      );
      return res.status(200).json({
        film_id: film.film_id,
        film_name: film.film_name,
        film_name_real: film.film_name_real,
        image: `${process.env.HOST}files/${film.image}`,
        description: film.description,
        episode_list: episode,
      });
    } else {
      return res.status(404).json({ message: "Film not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getTopView = async (req, res) => {
  try {
    const topSingle = await Film.findAll({
      where: { type_id: 1 },
      limit: 10,
      order: [["num_view", "DESC"]],
      attributes: [
        "film_id",
        "film_name",
        "film_name_real",
        "num_view",
        "image",
      ],
    });
    const topSeries = await Film.findAll({
      where: { type_id: 2 },
      limit: 10,
      order: [["num_view", "DESC"]],
      attributes: [
        "film_id",
        "film_name",
        "film_name_real",
        "num_view",
        "image",
      ],
    });
    if (topSingle.length > 0 && topSeries.length > 0) {
      return res.status(200).json({
        topSingle: topSingle,
        topSeries: topSeries,
      });
    } else return res.status(404).json({ message: "Error load top view" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const getByCategory = async (req, res) => {
  try {
    const film = await CategoryFilm.findAndCountAll({
      where: { category_id: req.params.category_id },
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
    const category = await Category.findOne({
      where: { category_id: req.params.category_id },
      attributes: ["category_name"],
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
    if (filmlist.length > 0 && category) {
      return res.status(200).json({
        category_name: category.category_name,
        count: film.count,
        film_list: filmlist,
      });
    } else return res.status(404).json({ message: "Film by category null" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getByCountry = async (req, res) => {
  try {
    const film = await Film.findAndCountAll({
      where: { country_id: req.params.country_id },
      raw: true,
      limit: 15,
      offset: (req.query.page - 1) * 15,
      order: [["film_id", "DESC"]],
      attributes: ["film_id", "film_name", "film_name_real", "status", "image"],
    });
    const country = await Country.findOne({
      where: { country_id: req.params.country_id },
      attributes: ["country_name"],
    });
    if (film.rows.length > 0 && country) {
      return res.status(200).json({
        country_name: country.country_name,
        count: film.count,
        film_list: film.rows,
      });
    } else return res.status(404).json({ message: "Film by country null" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const getByType = async (req, res) => {
  try {
    const type = await Type.findOne({
      where: { handle: req.params.handle },
      attributes: ["type_id", "type_name"],
    });
    if (type) {
      const film = await Film.findAndCountAll({
        where: { type_id: type.type_id },
        raw: true,
        order: [["film_id", "DESC"]],
        limit: 15,
        offset: (req.query.page - 1) * 15,
        attributes: [
          "film_id",
          "film_name",
          "film_name_real",
          "status",
          "image",
        ],
      });
      if (film.rows.length > 0)
        return res.status(200).json({
          type_name: type.type_name,
          count: film.count,
          film_list: film.rows,
        });
      else return res.status(404).json({ message: "Null" });
    } else return res.status(404).json({ message: "Film by type null" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const searchByText = async (req, res) => {
  try {
    const film = await sequelize.query(
      `SELECT * FROM search_func('${req.query.content}')`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const responseLabel = await axios.get("http://localhost:5001/label", {
      params: { text: req.query.content },
    });
    const filmLabel = await Film.findAll({
      where: { tag: responseLabel.data.label },
      order: [Sequelize.fn("RANDOM"), ["film_id", "DESC"]],
      limit: 10,
      //order: [["num_view", "DESC"]],
      attributes: [
        "film_id",
        "film_name",
        "film_name_real",
        "status",
        "image",
      ],
    });
    if (film.length > 0 && filmLabel.length > 0) {
      return res.status(200).json({
        success: true,
        film_list: film,
        film_label: filmLabel,
      });
    } else {
      return res.status(200).json({
        success: false,
        film_list: film,
        film_label: filmLabel,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
export {
  createFilm,
  getOneFilm,
  top8New,
  getEpisodeFilm,
  getTopView,
  getByCategory,
  getByCountry,
  getByType,
  searchByText,
};
