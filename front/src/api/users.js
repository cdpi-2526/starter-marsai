import instance from "./config.js";

async function getUsers() {
  return await instance.get("users");
  // http://localhost:3000/users; fetch method GET
}

export { getUsers };
