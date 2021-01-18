import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import User from "./user.js";
import Film from "./film.js";
const Marked = sequelize.define(
  "movie_marked",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
User.hasMany(Marked, { foreignKey: "user_id" });
Marked.belongsTo(User, { foreignKey: "user_id"});

Film.hasMany(Marked, { foreignKey: "film_id" });
Marked.belongsTo(Film, { foreignKey: "film_id" });
export default Marked;
