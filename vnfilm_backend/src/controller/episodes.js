import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import Episode from "../models/episode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createEpisode = async (req, res) => {
  const { episode, episode_name, film_id } = req.body;
  try {
    const episodeCre = await Episode.create(
      {
        episode,
        episode_name,
        content: `videos/${req.files.content.name}`,
        film_id,
      },
      {
        fields: ["episode", "episode_name", "content", "film_id"],
      }
    );
    if (episodeCre) {
      return res.status(201).json({
        message: "Episode created",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};
export { createEpisode };
