import express from "express";

const awards = express.Router();

// Awards

awards.get("/", (request, res) => {
  res.send("Coucou les récompenses");
});

awards.post("/", (request, res) => {
  res.send("Coucou les récompenses en POST");
});

awards.put("/", (request, res) => {
  res.send("Coucou les récompenses en PUT");
});

awards.delete("/", (request, res) => {
  res.send("Coucou les récompenses en DELETE");
});

export default awards;
