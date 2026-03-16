import express from "express";
import upload from "./upload.routes.js";
import awards from "./awards.routes.js";
import users from "./users.routes.js";
import categories from "./categories.routes.js";
import authRouter from "./Auth.route.js";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/films", upload);
routes.use("/awards", awards);
routes.use("/users", users);
routes.use("/categories", categories);

export default routes;
