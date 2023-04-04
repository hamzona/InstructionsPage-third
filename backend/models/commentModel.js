const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  content: { type: String },
  postId: { type: String, required: true },
  userName: { type: String, required: true },
  rate: { type: Number },
});
const model = mongoose.model("Comments", Schema);

module.exports = model;
