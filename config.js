const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: ".env",
});

module.exports = {
  EMAIL: process.env.EMAIL,
  SENHA: process.env.SENHA
};
