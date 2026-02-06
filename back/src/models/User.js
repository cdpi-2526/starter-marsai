import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("ADMIN", "JURY", "PRODUCER"),
    defaultValue: "PRODUCER",
    allowNull: false,
  },
  facebookUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitterUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagramUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedinUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tiktokUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default User;
