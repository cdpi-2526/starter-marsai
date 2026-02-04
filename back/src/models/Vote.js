import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Vote = sequelize.define("Vote", {
  rate: {
    type: DataTypes.ENUM("like", "dislike", "to review"),
    allowNull: false,
  },
});

export default Vote;
