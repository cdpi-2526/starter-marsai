import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const VideoCategory = sequelize.define("VideoCategory");

export default VideoCategory;
