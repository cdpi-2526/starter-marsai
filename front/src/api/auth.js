import instance from "./config.js";

async function login(data) {
  return await instance.post("auth/login", data);
}

async function signIn(data) {
  return await instance.post("auth/register", data);
}

async function checkToken(data) {
  return await instance.post("auth/checkToken", data);
}

export { login, signIn, checkToken };
