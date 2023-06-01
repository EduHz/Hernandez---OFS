const express = require("express");
const blogsController = require("./controllers/blogs");

const router = express.Router();

router.get("/api/blogs", blogsController.getAllBlogs);
router.post("/api/blogs", blogsController.createBlogs);

module.exports = router;
