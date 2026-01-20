import User from "../models/User.js";

function getUsers(req, res) {
  User.findAll().then((users) => {
    res.json(users);
  });
}

function createUser(req, res) {
  const { username, password } = req.params;

  if (!username || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  User.findOne({ where: { username } }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      User.create({ username: username, password: password }).then(
        (newUser) => {
          res.status(201).json(newUser);
        },
      );
    }
  });
}

function deleteUser() {}
function updateUser() {}

function getUserById() {}
function getUserByEmail() {}

export default { getUsers, createUser };
