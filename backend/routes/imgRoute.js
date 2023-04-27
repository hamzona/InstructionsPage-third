const route = require("express").Router();
const {
  upload,
  saveFileName,
  getImg,
  deleteImg,
} = require("../controllers/imgController");
const auth = require("../middleware/authJwtMiddleware");
route.post("/post/:name", auth, deleteImg, upload, saveFileName);
route.get("/getImg/:name", auth, getImg);
route.get("/getImgPublic/:name", getImg);
module.exports = route;
