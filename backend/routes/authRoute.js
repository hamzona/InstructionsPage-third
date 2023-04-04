const express = require("express");
const route = express.Router();
const { singup, login } = require("../controllers/authController");
//singup
route.get("/singup", (req, res) => {
  res.send("/singup");
});
route.post("/singup", singup);
//login
route.post("/login", login);
//logout

module.exports = route;
