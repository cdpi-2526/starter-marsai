import User from "../models";
import { hashPassword } from "./password.js";

const hash = await hashPassword("admin2");
User.create({ username: "admin2", password: hash, role: "ADMIN" }).then(
  (newUser) => {
    console.log("Admin user created:", newUser);
  },
);
