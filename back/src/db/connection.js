import { Sequelize } from "sequelize";

const sequelize = new Sequelize("marsai", "root", "rootroot", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default sequelize;
