require("dotenv").config();
const mongoose = require("mongoose");

const config = {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
};

const connect = () => {
  return mongoose
    .connect(config.mongodbUrl)
    .then(() => console.log("Database connected "))
    .catch((err) => console.log("db error", err.message));
};

module.exports = { connect, config };





