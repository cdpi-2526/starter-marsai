import express from "express";

const categories = express.Router();

// Categories
categories.get("/", (request, res) => {
  res.send("Coucou les catégories");
});

categories.post("/", (request, res) => {
  res.send("Coucou les catégories en POST");
});

categories.put("/", (request, res) => {
  res.send("Coucou les catégories en PUT");
});

categories.delete("/", (request, res) => {
  res.send("Coucou les catégories en DELETE");
});

export default categories;
