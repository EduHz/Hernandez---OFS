const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const routes = require("./routes");
const app = express();

logger.info("connecting to", MONGODB_URI);

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connecting to MongoDB:", error.message);
  }
})();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
