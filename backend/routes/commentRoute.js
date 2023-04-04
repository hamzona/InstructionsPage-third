const express = require("express");
const auth = require("../middleware/authJwtMiddleware");
const route = express();
const {
  postComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
route.post("/add", auth, postComment);
route.post("/all", auth, getComments);
route.delete("/delete", deleteComment);
module.exports = route;
