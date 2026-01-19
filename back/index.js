import express from "express";
import cors from "cors";

import User from "./src/models/User.js";

const app = express();

app.use(cors({ origin: "*" })); // Autoriser les requêtes CORS de toutes origines

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
});

app.get("/users/:username", (req, res) => {
  const { username } = req.params;
  User.findOne({ where: { username } }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      User.create({ username: username }).then((newUser) => {
        res.status(201).json(newUser);
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("-----------------------------");
  console.log("--        L'ARBITRE        --");
  console.log("-----------------------------");

  console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});
