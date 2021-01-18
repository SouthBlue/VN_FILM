import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import Film from "../models/film.js";

const Episode = sequelize.define(
  "episode",
  {
    episode_id: {
      type: Sequelize.INTEGER,
    },
    episode: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    episode_name: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    film_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
Film.hasMany(Episode, { foreignKey: "film_id", sourceKey: "film_id" });
Episode.belongsTo(Film, { foreignKey: "film_id", targetKey: "film_id" });
export default Episode;
