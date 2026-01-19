import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default User;
