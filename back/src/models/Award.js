import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Award = sequelize.define("Award", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Award;
