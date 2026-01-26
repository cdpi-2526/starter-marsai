import User from "../models/User.js";
import { comparePassword } from "../utils/password.js";
import UserController from "./UserController.js";

function login(req, res) {
  const { username, password } = req.body;

  User.findOne({ where: { username } }).then((user) => {
    if (user) {
      comparePassword(password, user.password).then((isMatch) => {
        if (isMatch) {
          res.status(200).json({ message: "Login successful", user });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
}

function register(req, res) {
  UserController.createUser(req, res);
  // Envoi d'email
}

export default { login, register };
