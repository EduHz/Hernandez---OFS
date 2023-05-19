// controllers/blogs.js
const Blogs = require("../models/blog");

// Controlador para obtener todas las notas
const getAllBlogss = (request, response) => {
  Blogs.find({}).then((blogs) => {
    response.json(blogs);
  });
};

// Controlador para crear una nueva nota
const createBlogs = (request, response) => {
  const blog = new Blogs(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};

module.exports = {
  getAllBlogss,
  createBlogs,
};
