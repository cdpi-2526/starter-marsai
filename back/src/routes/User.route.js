import express from "express";
import UserController from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/", UserController.getUsers); // Liste de tous les utilisateurs
userRouter.get("/:id", UserController.getUserById); // Récupérer un utilisateur par ID
userRouter.post("/", UserController.createUser); // Créer un nouvel utilisateur
userRouter.delete("/:id", UserController.deleteUser); // Supprimer un utilisateur par ID
userRouter.put("/:id", UserController.updateUser); // Modifier un utilisateur par ID

export default userRouter;
