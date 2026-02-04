import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Config = sequelize.define(
  "Config",
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Config",
  },
);

export default Config;
