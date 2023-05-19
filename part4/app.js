// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// Importa los controladores y modelos
const blogsController = require("./controllers/blogs");
const Blog = require("./models/blog");

// Configuraciones de Express
app.use(cors());
app.use(express.json());

// Rutas
app.get("/api/blogs", blogsController.getAllBlogss);
app.post("/api/blogs", blogsController.createBlogs);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
