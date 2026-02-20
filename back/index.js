import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/routes.js";

import sequelize from "./src/db/connection.js";
dotenv.config();
const app = express(); // Créer un serveur web, l'équivalent de Apache avec PHP

// Configuration par défaut du serveur
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 80;

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});

sequelize.sync({ force: false }).then(() => {
  console.log("La base de données est synchronisée.");
});
