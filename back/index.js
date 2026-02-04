import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import sequelize from "./src/db/connection.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use(router);

app.listen(PORT, () => {
  console.log(" ----------------------------");
  console.log("|        L'ARBITRE           |");
  console.log(" ----------------------------");
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});

sequelize.sync({ force: true }).then(() => {
  console.log("La base de données est synchronisée.");
});
