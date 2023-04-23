const route = require("express").Router();
const { upload, saveFileName } = require("../controllers/imgController");
const auth = require("../middleware/authJwtMiddleware");
route.post("/post", auth, upload, saveFileName);

module.exports = route;
