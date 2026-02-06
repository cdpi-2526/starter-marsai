import { User } from "../models/index.js";
import { comparePassword } from "../utils/password.js";
import UserController from "./UserController.js";
import jwt from "jsonwebtoken";

function login(req, res) {
  const { username, password } = req.body;

  // Sequelize
  User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Functions utilisateurs
    comparePassword(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // jwt librairie
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });

      // Express response
      return res.status(200).json({
        message: "Login successful",
        username: user.username,
        token,
      });
    });
  });
}

function register(req, res) {
  UserController.createUser(req, res);
  // Envoi d'email
}

async function checkToken(req, res) {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded?.username) {
    return res.status(401).json({ error: "Invalid Payload" });
  }

  const user = await User.findOne({
    where: { username: decoded.username },
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  return res.status(200).json({
    message: "Token is valid",
    username: user.username,
    role: user.role,
  });
}

export default { login, register, checkToken };
