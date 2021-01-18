import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import User from "../models/user.js";
import Film from "../models/film.js";
import Episode from "../models/episode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Dashboard = async (req, res) => {
  try {
    const user = await User.findAndCountAll({ where: { role: "client" } });
    const film = await Film.findAndCountAll();
    const episode = await Episode.findAndCountAll();
    return res.status(200).json({
      user: user.count,
      film: film.count,
      episode: episode.count,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export {Dashboard}