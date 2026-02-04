import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";
import User from "./User.js";

const Video = sequelize.define("Video", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Video;
